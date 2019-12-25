import React  from "react";
import { Link } from "react-router-dom";
import { Header, Menu } from "semantic-ui-react";
import { client } from "../Client";

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
            name='home'
            to={'/home'}
            active={path === '/home' || path === '/'}
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
    </Menu.Menu>
);

const NavBarMenu = ({ location, handleLogout }) => (
    <Header>
        <Menu secondary>
            {client.isLoggedIn() && MenuLeftItems(location.pathname)}
            <Menu.Menu position='right'>
                {
                    client.isLoggedIn() ? (
                        <Menu.Item
                            name='logout'
                            as={Link}
                            to={'/logout'}
                            active={location.pathname === '/logout'}
                            onClick={handleLogout}
                        />

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


export default  NavBarMenu;


