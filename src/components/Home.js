import React from 'react';
import NavBarMenu from  './NavBarMenu';
import Posts from './Posts';

const Home = ({ user, match }) => (
    <div>
        <NavBarMenu match={match} />
        <Posts />
    </div>
);

export default Home;
