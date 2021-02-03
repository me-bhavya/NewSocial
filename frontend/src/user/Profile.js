import React, { Component } from "react";
import { isAuthenticated } from "../auth/index";
import { Redirect, Link } from "react-router-dom";
import { readUser } from "./apiUser";

class Profile extends Component {
	constructor() {
		super();
		this.state = {
			user: "",
			redirect: false,
		};
	}

	init = (userId) => {
		const token = isAuthenticated().token;
		readUser(userId, token)
			.then((data) => {
				if (data.error) {
					this.setState({ redirect: true });
				} else {
					this.setState({ user: data.user });
				}
			})
			.catch((err) => {
				console.log(err);
			});
	};

	componentDidMount() {
		const userId = this.props.match.params.userId;
		this.init(userId);
	}

	render() {
		console.log(this.state.user);
		if (this.state.redirect) {
			return <Redirect to='/signin' />;
		}
		return (
			<div className='container'>
				<h2 className='mt-5 mb-5 ml-3'>Profile</h2>
				<div className='col-md-6'>
					<Link
						to={`/user/edit/${this.state.user._id}`}
						className='btn btn-raised btn-success mr-2'>
						Edit Profile
					</Link>
					<Link className='btn btn-raised btn-danger'>
						Delete Profile
					</Link>
				</div>
				<div className='col-md-6 mt-5'>
					<p>Hello {this.state.user.name}</p>
					<p>{this.state.user.email}</p>
				</div>
			</div>
		);
	}
}

export default Profile;
