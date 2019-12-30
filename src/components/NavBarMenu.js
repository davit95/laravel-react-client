import React  from "react";
import { Link, Redirect, withRouter } from "react-router-dom";
import { Header, Menu, Image } from "semantic-ui-react";
import { client } from "../Client";
import http from "../http";

const LoginButton = (path) => {
    return (
        <Menu.Item
            as={Link}
            to={'/login'}
            key={'login'}
            name='login'
            active={path === '/login'}
        />
    )
};

const RegisterButton = (path) => {
    return (
        <Menu.Item
            as={Link}
            to={'/register'}
            key={'register'}
            name='register'
            active={path === '/register'}
        />
    )
};

const MenuLeftItems = (path) => (
    <Menu.Menu position={'left'}>
        <Menu.Item
            as={Link}
            name='profile'
            to={'/profile'}
            active={path === '/profile'}
        />
        <Menu.Item
            as={Link}
            to={'/map'}
            name='map'
            active={path === '/map'}
        />
        <Menu.Item
            as={Link}
            to={'/posts'}
            name='posts'
            active={path === '/posts'}
        />
        <Menu.Item
            as={Link}
            to={'/infinite-posts'}
            name='infinite-posts'
            active={path === '/infinite-posts'}
        />
    </Menu.Menu>
);

const redirect = async (location, handleRemoveUser) => (
    http.post('logout') &&
    handleRemoveUser() &&
    <Redirect to={{
        pathname: '/login',
        state: location
    }}/>
);

const NavBarMenu = ({ location, handleLogout, handleRemoveUser }) => (
    <Header style={{ paddingTop: '3px' }}>
        <Menu secondary>
            {client.isLoggedIn() && MenuLeftItems(location.pathname)}
            <Menu.Menu position='right'>
                {
                    client.isLoggedIn() ? (
                        [
                            <Image
                                key={'image'}
                                src='https://react.semantic-ui.com/images/wireframe/square-image.png'
                                width={40}
                                height={40}
                                circular />,
                            <Menu.Item
                                name='logout'
                                key={'logout'}
                                active={location.pathname === '/logout'}
                                onClick={() => redirect(location, handleRemoveUser)}
                            />
                        ]

                    ) : (
                        [
                            RegisterButton(location.pathname), LoginButton(location.pathname)
                        ]
                    )
                }
            </Menu.Menu>
        </Menu>
    </Header>
);


export default  withRouter(NavBarMenu);


