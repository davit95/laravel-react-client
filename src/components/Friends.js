import React from 'react';
import NavBarMenu from "./NavBarMenu";

const Friends = ({ match }) => (
    <div>
        <NavBarMenu match={match} />
        <p>Friends Page</p>
    </div>
);

export default Friends;
