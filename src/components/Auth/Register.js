import React from 'react';
import { Redirect } from 'react-router-dom';
import RegisterForm  from './RegisterForm';
import { client } from '../../Client';

export default ({ user, handleSetUser }) => client.isLoggedIn() ?
    <Redirect to={'/messages'} /> :
    <RegisterForm user={user} handleSetUser={handleSetUser} />
