import React from 'react';

export default function InputBox({ name, type, id, value, placeholder, icon }) {
  const [passwordVisible, setPasswordvisible] = React.useState(false);
  return (
    <div className='relative w-[100%] mb-4'>
      <input
        name={name}
        type={
          type === 'password' ? (passwordVisible ? 'text' : 'password') : 'text'
        }
        placeholder={placeholder}
        id={id}
        defaultValue={value}
        className='input-box'
      />
      <i className={'fi ' + icon + ' input-icon'}></i>

      {type == 'password' ? (
        <i
          className={
            'fi fi-rr-eye' +
            (!passwordVisible ? '-crossed' : '') +
            ' input-icon left-auto right-4 cursor-pointer'
          }
          onClick={() => setPasswordvisible((currval) => !currval)}
        />
      ) : (
        ''
      )}
    </div>
  );
}
