import React from 'react';
import SavedMovies from '../components/SavedMovies';

const Account = () => {
  return (
    <>
      <div className='w-full text-white'>
        <img
          className='w-full h-[400px] object-cover'
          src='https://assets.nflxext.com/ffe/siteui/vlv3/0f07b807-7be1-457d-be88-eb9153d5d4e9/e899568a-fb20-40c9-b376-04949af811a7/AR-es-20220815-popsignuptwoweeks-perspective_alpha_website_large.jpg'
          alt='/'
        />
        <div className='bg-black/60 fixed top-0 left-0 w-full h-[550px]'></div>
        <div className='absolute top-[20%] p-4 md:p-8'>
          <h1 className='text-3xl md:text-5xl font-bold'>Account</h1>
        </div>
      </div>
      <SavedMovies />
    </>
  );
};

export default Account;