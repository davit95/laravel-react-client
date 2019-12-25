import React from 'react';
import { Redirect } from 'react-router-dom';
import LoginForm  from './LoginForm';
import { client } from '../../Client';

export default ({ user, handleSetUser, match }) => client.isLoggedIn() ?
    <Redirect to={'/home'} /> :
    <LoginForm user={user} handleSetUser={handleSetUser} />

