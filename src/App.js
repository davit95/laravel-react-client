import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { Container } from "semantic-ui-react";
import Routes from './Routes';
import http from './http';
import { client } from './Client';

const App =  ({ showNavBar = true, context }) => {
    const [user, setUser] = useState({});
    const handleSetUser = async () => {
        getUser();
    };

    const handleRemoveUser = async () => {
        removeUser();
        client.removeToken();
    };

    const getUser = async () => {
        const response = await http.get('user');
        setUser({ ...response.data.user });
    };

    const removeUser = async () => {
        setUser({});
    };

    const redirect = () => <Redirect to={{
        pathname: '/login',
    }}/>

    useEffect(() => {
        if (process.browser) {
            if (localStorage.token && localStorage.token.length) {
                Object.assign(http.defaults, { headers: { 'Authorization': `Bearer ${localStorage.token}` } })
            } else {
                redirect()
            }

            getUser();
        }
    }, []);

    return (
        <Container>
            <Routes
                user={user}
                handleSetUser={handleSetUser}
                handleRemoveUser={handleRemoveUser}
                showNavBar={showNavBar}
            />
        </Container>
    )

};

export default App;
