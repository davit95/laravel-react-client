import React from 'react';
import { Redirect } from 'react-router-dom';
import LoginForm  from './LoginForm';
import { client } from '../../Client';
import NavBarMenu from '../NavBarMenu';

export default ({ user, handleSetUser, match }) => client.isLoggedIn() ?
    <Redirect to={'/home'} /> :
    <div>
        <NavBarMenu user={ user } match={ match } />
        <LoginForm user={user} handleSetUser={handleSetUser} />
    </div>

