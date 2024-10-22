// eslint-disable-next-line no-unused-vars
import React from 'react';
import AccountProfile from '../components/AccountProfile';
import AccountSidebar from '../components/AccountSidebar';

function Account() {
  return (
    <>
    <div className='flex flex-row justify-evenly items-center h-screen '>
      <AccountSidebar/>
      <AccountProfile />
    </div>
    </>
  )
}

export default Account;

