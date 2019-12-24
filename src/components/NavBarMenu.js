import React  from "react";
import { Link } from "react-router-dom";
import { Header, Menu } from "semantic-ui-react";
import { client } from "../Client";

const LoginButton = (match) => {
    return (
        <Menu.Item
            as={Link}
            to={'/login'}
            key={'login'}
            name='login'
            active={match.path === '/login'}
        />
    )
};

const RegisterButton = (match) => {
    return (
        <Menu.Item
            as={Link}
            to={'/register'}
            key={'register'}
            name='register'
            active={match.path === '/register'}
        />
    )
};

const MenuLeftItems = (match) => (
    <Menu.Menu position={'left'}>
        <Menu.Item
            as={Link}
            name='home'
            to={'/home'}
            active={match.path === '/home' || match.path === '/'}
        />
        <Menu.Item
            as={Link}
            to={'/messages'}
            name='messages'
            active={match.path === '/messages'}
        />

        <Menu.Item
            as={Link}
            to={'/posts'}
            name='posts'
            active={match.path === '/posts'}
        />
    </Menu.Menu>
);

const NavBarMenu = ({ match, handleLogout }) => (
    <Header>
        <Menu secondary>
            { client.isLoggedIn() && MenuLeftItems(match) }
            <Menu.Menu position='right'>
                {
                    client.isLoggedIn() ? (
                        <Menu.Item
                            name='logout'
                            as={Link}
                            to={'/logout'}
                            active={match.path === '/logout'}
                            onClick={handleLogout}
                        />

                        ) :  (
                        [
                            RegisterButton(match), LoginButton(match)
                        ]
                    )
                }
            </Menu.Menu>
        </Menu>
    </Header>
);

export default NavBarMenu;


