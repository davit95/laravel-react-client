import React from "react";
import {
    Switch,
    Route
} from "react-router-dom";

import Posts from './components/Posts';
import Home from './components/Home';
import InfinitePosts from './components/InfinitePosts';
import InfinitePostEdit from './components/InfinitePosts/InfinitePostEdit';
import InfinitePostShow from './components/InfinitePosts/InfinitePostShow';
import Map from './components/Map/GoogleMap';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import PrivateRoute from './PrivateRoute';
import NavBarMenu from './components/NavBarMenu';
import Profile from './components/Profile/Profile';
const Notfound = () => <h1>Not found</h1>;

const Routes = ({ user, handleSetUser, handleRemoveUser }) => (
    <React.Fragment>
        <NavBarMenu handleRemoveUser={ handleRemoveUser } />
        <Switch>
            <PrivateRoute exact path={"/"} component={(routeProps) => <Home user={ user } {...routeProps} />} />
            <PrivateRoute exact path={"/profile"} component={(routeProps) => <Profile user={ user } {...routeProps} />} />
            <PrivateRoute exact path={"/posts"} component={(routeProps) => <Posts user={ user } {...routeProps} />} />
            <Route exact path="/login" component={ (routeProps) => <Login user={ user } handleSetUser={ handleSetUser } {...routeProps} /> } />
            <Route exact path="/register" component={ (routeProps) => <Register user={ user } handleSetUser={ handleSetUser } {...routeProps} /> } />
            <PrivateRoute exact path="/map" component={(routeProps) => <Map {...routeProps} />} />
            <PrivateRoute exact path="/infinite-posts" component={(routeProps) => <InfinitePosts {...routeProps} />} />
            <PrivateRoute exact path="/infinite-posts/:id/edit" component={(routeProps) => <InfinitePostEdit {...routeProps} />} />
            <PrivateRoute exact path="/posts/create" component={(routeProps) => <InfinitePostEdit {...routeProps} />} />
            <PrivateRoute exact path="/infinite-posts/:id/show" component={(routeProps) => <InfinitePostShow {...routeProps} />} />
            <Route component={Notfound} />
        </Switch>
    </React.Fragment>

);

export default Routes;
