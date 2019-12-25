import React from "react";
import {
    Switch,
    Route,
    withRouter
} from "react-router-dom";

import Home from './components/Home';
import InfinitePosts from './components/InfinitePosts';
import InfinitePostEdit from './components/InfinitePosts/InfinitePostEdit';
import InfinitePostShow from './components/InfinitePosts/InfinitePostShow';
import Map from './components/Map/GoogleMap';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import LogOut from './components/Auth/LogOut';
import PrivateRoute from './PrivateRoute';
import NavBarMenu from './components/NavBarMenu';
const Notfound = () => <h1>Not found</h1>;

const Menu = withRouter(NavBarMenu)


const Routes = ({ user, handleSetUser, handleRemoveUser }) => (
    <div>
        <Menu />
        <Switch>
            <PrivateRoute path={"/home"} component={(routeProps) => <Home user={ user } {...routeProps} />} />
            <Route exact path="/logout" component={ (routeProps) => <LogOut handleRemoveUser={ handleRemoveUser } {...routeProps} /> } />
            <Route exact path="/login" component={ (routeProps) => <Login user={ user } handleSetUser={ handleSetUser } {...routeProps} /> } />
            <Route exact path="/register" component={ (routeProps) => <Register user={ user } handleSetUser={ handleSetUser } {...routeProps} /> } />
            <PrivateRoute exact path="/map" component={(routeProps) => <Map {...routeProps} />} />
            <PrivateRoute exact path="/posts" component={(routeProps) => <InfinitePosts {...routeProps} />} />
            <PrivateRoute exact path="/posts/:id/edit" component={(routeProps) => <InfinitePostEdit {...routeProps} />} />
            <PrivateRoute exact path="/posts/create" component={(routeProps) => <InfinitePostEdit {...routeProps} />} />
            <PrivateRoute exact path="/posts/:id/show" component={(routeProps) => <InfinitePostShow {...routeProps} />} />
            <Route component={Notfound} />
        </Switch>
    </div>

);

export default Routes;
