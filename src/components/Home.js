import React from 'react';
import NavBarMenu from  './NavBarMenu';

const Home = ({ user, match }) => (
    <div>
        <NavBarMenu match={match} />
        <p>Home page</p>
    </div>
);

export default Home;
