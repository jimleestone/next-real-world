import React, { useState } from 'react';
import { useCurrentUser } from '../../lib/hooks/use-current-user';
import CustomLink from './CustomLink';
import NavItem from './NavItem';

export default function Header() {
  const { user, loading } = useCurrentUser();
  const [ariaExpanded, setAriaExpanded] = useState(false);
  return (
    <nav className='bg-white py-2.5 rounded-b fixed w-full z-20 shadow-md shadow-gray-300'>
      <div className='container flex flex-wrap justify-between items-center mx-auto'>
        <CustomLink className='flex items-center' href='/'>
          <span className='self-center text-primary text-2xl font-titillium whitespace-nowrap '>conduit</span>
        </CustomLink>
        <button
          onClick={() => setAriaExpanded(!ariaExpanded)}
          type='button'
          className='inline-flex items-center p-2 ml-3 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 '
          aria-controls='navbar-default'
          aria-expanded={ariaExpanded}
        >
          <span className='sr-only'>Open main menu</span>
          <svg
            className='w-6 h-6'
            aria-hidden='true'
            fill='currentColor'
            viewBox='0 0 20 20'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              fillRule='evenodd'
              d='M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z'
              clipRule='evenodd'
            ></path>
          </svg>
        </button>

        <div className={`${ariaExpanded ? 'block' : 'hidden'} w-full md:block md:w-auto`} id='navbar-default'>
          <ul className='flex flex-col mt-4 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium'>
            {!loading && (
              <>
                <NavItem text='Home' href='/' />
                {user ? (
                  <React.Fragment>
                    <NavItem text='New Article' href='/editor' icon='ion-compose' />
                    <NavItem text='Settings' href='/settings' icon='ion-gear-a' />
                    <NavItem text={`${user.username}`} href={`/profile/${user.username}`} />
                  </React.Fragment>
                ) : (
                  <React.Fragment>
                    <NavItem text='Sign in' href='/login' />
                    <NavItem text='Sign up' href='/register' />
                  </React.Fragment>
                )}
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}
