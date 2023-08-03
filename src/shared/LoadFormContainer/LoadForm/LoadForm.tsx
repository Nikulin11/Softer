import axios from 'axios';
import React, { ChangeEvent, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store/store';
import './loadform.css';
import { Spinner } from '../../Spinner';
import { generateRandomString } from '../../../utils/react/generateRandomIndex';

export function LoadForm() {
  const token = useSelector<RootState, string>(state => state.token);
  const [files, setFiles] = useState<FileList | any[] | null>(null);
  const [error, setError] = useState('');
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [loading, setLoading] = useState(false);
  const [countUploadedFiles, setCountUploadedFiles] = useState(0);
  const filePicker = useRef<HTMLInputElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  async function onSubmit(event: ChangeEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!files) {
      setError('Добавьте файлы для загрузки');
      return false;
    } else {
      setError('');
    }
    setButtonDisabled(true);
    setLoading(true);
    for (let i = 0; i <= files.length - 1; i++) {
      let formData = new FormData();
      formData.append('File', files[i]);
      await axios.get(`https://cloud-api.yandex.net/v1/disk/resources/upload?path=${files[i].name}`, {
        headers: {
            "Content-Type": "application/json",
            "Authorization": `OAuth ${token}`,
        }
      })
        .then(async (resp) => {
            await axios.put(resp.data.href, formData, {
              headers: {
                'Content-Type': 'multipart/form-data',
              }
            })
              .then((resp) => {
                  setCountUploadedFiles(countUploadedFiles => countUploadedFiles + 1);
              })
              .catch(error => {
                  console.log(error);
              })
        })
        .catch(error => {
            console.log(error);
        })

      if (i === files.length - 1) {
        setFiles(null);
        setButtonDisabled(false);
        setLoading(false);
        setCountUploadedFiles(0);
        formRef.current?.reset();
      }
    }
  }

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    if (event.target.files?.length && event.target.files?.length > 100) {
      setError('Максимальное количество файлов для загрузки - 100');
      setFiles(null);
    } else if (!event.target.files?.length && event.target.files?.length === 0) {
      setFiles(null);
    } else {
      setFiles(event.target.files);
      setError('');
    }
  }

  function handlePick() {
    if (filePicker.current !== null) {
      filePicker.current.click();
    }
  }

  return (
    <form ref={formRef} className='form' onSubmit={onSubmit}>
      {error && (
        <div className='error-text'>{error}</div>
      )}
      <div className='button-group'>
        <button type='button' onClick={handlePick} disabled={buttonDisabled} className='filePicker'>Добавить файлы</button>
        <input className='hidden' ref={filePicker} multiple onChange={handleChange} type="file"/>
        <button className='sendButton' disabled={error || buttonDisabled ? true : false}>Отправить</button>
      </div>
      {(files?.length !== 0 && files) && (
        loading ?
          <div className='loading-block'>
            <div>Загружено {countUploadedFiles} из {files.length} файлов</div>
            <Spinner />
          </div>
          :
          <div className='load-files'>
            <h3>Список загружаемых файлов:</h3>
            <ol>
              {files && Array.from(files).map((el: {name: string, size: number}) => {
                return (
                  <li key={generateRandomString()} className='load-file'>{el.name} - {Math.round(el.size/1000)}Кб</li>
                )
              })}
            </ol>
          </div>
      )}
    </form>
  )
}
