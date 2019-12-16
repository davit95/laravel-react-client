import React from 'react';
import NavBarMenu from "./NavBarMenu";

const Messages = ({ match }) => (
    <div>
        <NavBarMenu match={match} />
        <p>Messages Page</p>
    </div>
);

export default Messages;
