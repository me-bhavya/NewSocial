import React, { Component } from "react";
import { list } from "./apiUser";
import DefaultImage from "../images/avatar.svg";
import { Link } from "react-router-dom";

class User extends Component {
	constructor() {
		super();
		this.state = {
			users: [],
		};
	}

	componentDidMount() {
		list()
			.then((data) => {
				if (data.error) {
					console.log(data.error);
				} else {
					console.log(data);
					this.setState({ users: data.users });
				}
			})
			.catch((err) => {
				console.log(err);
			});
	}

	render() {
		console.log(this.state.users);
		return (
			<div className='card-deck mt-5 ml-5'>
				{this.state.users.map((user, i) => {
					return (
						<div
							key={i}
							className='card col-lg-3'
							style={{ height: "300px" }}>
							<img
								className='card-img-top'
								src={DefaultImage}
								alt={user.name}
							/>
							<div className='card-body'>
								<h5 className='card-title'>{user.name}</h5>
								<p className='card-text'>{user.email}</p>
								<Link
									to={`/user/${user._id}`}
									className='btn btn-primary btn-raised btn-sm col-md-6'>
									View Profile
								</Link>
							</div>
						</div>
					);
				})}
			</div>
		);
	}
}

export default User;
