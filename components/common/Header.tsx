import React from 'react';
import { useAuth } from '../../lib/hooks/use-auth';
import CustomLink from './CustomLink';
import NavItem from './NavItem';

export default function Header() {
  const { user } = useAuth();
  console.log(user);
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
              <NavItem
                text={`${user.username}`}
                href={{ pathname: '/profile/[username]', query: { username: user.username } }}
              />
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
