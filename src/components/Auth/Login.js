import React from 'react';
import { Redirect } from 'react-router-dom';
import LoginForm  from './LoginForm';
import { client } from '../../Client';

const redirectPath = (location) => {
    const locationState = location.state;
    const pathname = (
        locationState && locationState.from && locationState.from.pathname
    );
    return pathname || '/profile';
};

export default ({ user, handleSetUser, location }) => client.isLoggedIn() ?
    <Redirect to={redirectPath(location)} /> :
    <LoginForm user={user} handleSetUser={handleSetUser} />

