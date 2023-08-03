import React from 'react';
import './content.css';

interface IContent {
  children: React.ReactNode;
}

export function Content({children}: IContent) {
  return (
    <div className='content'>
      {children}
    </div>
  );
}
