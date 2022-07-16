import React from 'react';
import { useCurrentUser } from '../../lib/hooks/use-current-user';
import CustomLink from './CustomLink';
import NavItem from './NavItem';

export default function Header() {
  const { user } = useCurrentUser();
  return (
    <nav className='navbar navbar-light'>
      <div className='container'>
        <CustomLink className='navbar-brand' href='/'>
          conduit
        </CustomLink>
        <ul className='nav navbar-nav pull-xs-right'>
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
        </ul>
      </div>
    </nav>
  );
}
