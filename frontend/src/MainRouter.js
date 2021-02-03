import React from "react";
import { Route, Switch } from "react-router-dom";
import Home from "./core/Home";
import Menu from "./core/Menu";
import Signup from "./user/Signup";
import Signin from "./user/Signin";
import Profile from "./user/Profile";
import User from "./user/User";

const MainRouter = () => {
	return (
		<div>
			<Menu />
			<Switch>
				<Route path='/' component={Home} exact />
				<Route path='/signup' component={Signup} exact />
				<Route path='/signin' component={Signin} exact />
				<Route path='/user/:userId' component={Profile} exact />
				<Route path='/users' component={User} exact />
			</Switch>
		</div>
	);
};

export default MainRouter;
