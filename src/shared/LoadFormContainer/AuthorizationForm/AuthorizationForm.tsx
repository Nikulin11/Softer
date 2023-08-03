import React, { FormEvent, useRef, useState } from 'react';
import './authorizationform.css';

export function AuthorizationForm() {
  const inputRef = useRef<HTMLInputElement>(null);
  const [error, setError] = useState('');

  function onSubmit(event: FormEvent) {
    event.preventDefault();
    if (inputRef.current?.value === '') {
      setError('Необходимо ввести ClientID');
      return false;
    } else {
      setError('');
    }
    window.location.href = `https://oauth.yandex.ru/authorize?response_type=token&client_id=${inputRef.current?.value}`;
  }

  return (
    <form onSubmit={onSubmit} className='authorization-form'>
      <p>В поле для ввода необходимо ввести ClientID из созданного приложения в Яндекс.Диск REST API 
        (в созданном приложении должны быть подключены права на "Доступ к папке приложения на Диске", 
        "Чтение всего Диска", "Запись в любом месте на Диске", "Доступ к информации о Диске")</p>
      <input ref={inputRef} className={error ? 'authorization-form__input error' : 'authorization-form__input'} type="text" />
      {error && (
        <div className='error-text'>{error}</div>
      )}
      <button className='authorization-button'>
          Авторизоваться
      </button>
    </form>
  );
}
