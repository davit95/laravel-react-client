import React from 'react';
import NavBarMenu from '../NavBarMenu';
import InfinitePosts from './InfinitePosts';
export default ({ user, match, location }) => (
    <div>
        <NavBarMenu match={match} />
        <InfinitePosts location={location} match={match} />
    </div>
);
