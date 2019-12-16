import React from 'react';
import { Redirect } from 'react-router-dom';
import RegisterForm  from './RegisterForm';
import { client } from '../../Client';
import NavBarMenu from "../NavBarMenu";

export default ({ user, handleSetUser, match }) => client.isLoggedIn() ?
    <Redirect to={'/messages'} /> :
    <div>
        <NavBarMenu user={ user } match={ match } />
        <RegisterForm user={user} handleSetUser={handleSetUser} />
    </div>
