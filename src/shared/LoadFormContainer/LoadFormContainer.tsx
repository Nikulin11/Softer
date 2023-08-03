import React from 'react';
import { LoadForm } from './LoadForm/LoadForm';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import './loadformcontainer.css';
import { AuthorizationForm } from './AuthorizationForm';

export function LoadFormContainer() {
  const token = useSelector<RootState, string>(state => state.token);

  return (
    <div className='load-form__wrapper'>
      <div>
        <h2>Форма для отправки файлов на Яндекс.Диск</h2>
      </div>
      {!token ?
        <AuthorizationForm />
        : 
        <LoadForm />
      }
    </div>
  );
}
