import React from "react";
import { Link, withRouter } from "react-router-dom";
import { isAuthenticated, signout } from "../auth/index";

const Menu = () => {
	return (
		<div className='navbar navbar-dark bg-primary'>
			<ul className='nav nav-tabs'>
				<li className='nav-item'>
					<Link className='nav-link text-light' to='/'>
						Home
					</Link>
				</li>
				<li>
					<Link to='/users' className='nav-link text-light'>
						Users
					</Link>
				</li>
				{!isAuthenticated() && (
					<React.Fragment>
						<li className='nav-item'>
							<Link className='nav-link text-light' to='/signin'>
								Sign In
							</Link>
						</li>
						<li className='nav-item'>
							<Link className='nav-link text-light' to='signup'>
								Sign Up
							</Link>
						</li>
					</React.Fragment>
				)}
				{isAuthenticated() && (
					<React.Fragment>
						<li className='nav-item'>
							<a
								href='/'
								className='nav-link text-light'
								onClick={() => {
									signout(() => {
										window.history.push("/");
									});
								}}>
								Sign Out
							</a>
						</li>
						<li className='nav-item'>
							<Link
								className='nav-link'
								to={`/user/${isAuthenticated().user._id}`}>
								{/* {isAuthenticated().user.name} */}
								Your Profile
							</Link>
						</li>
					</React.Fragment>
				)}
			</ul>
		</div>
	);
};

export default withRouter(Menu);
