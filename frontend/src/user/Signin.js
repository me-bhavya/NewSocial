import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { signin, authenticate } from "../auth/index";

class Signin extends Component {
	constructor() {
		super();
		this.state = {
			email: "",
			password: "",
			error: "",
			redirectToReferer: false,
			loading: false,
		};
	}

	handleChange = (name) => (event) => {
		this.setState({ [name]: event.target.value, error: "" });
	};

	clickSubmit = (event) => {
		event.preventDefault();
		this.setState({ loading: true });
		const { email, password } = this.state;
		const user = {
			email: email,
			password: password,
		};
		signin(user).then((data) => {
			if (data.error) {
				this.setState({ error: data.error, loading: false });
			} else {
				// authenticate
				authenticate(data, () => {
					this.setState({ redirectToReferer: true });
				});
			}
		});
	};

	render() {
		if (this.state.redirectToReferer) {
			return <Redirect to='/' />;
		}

		return (
			<div style={{ width: "400px" }} className='container'>
				<h2 className='mt-5 mb-5'>Sign In</h2>
				{this.state.error ? (
					<div className='alert alert-danger'>{this.state.error}</div>
				) : (
					""
				)}
				{this.state.loading ? (
					<div className='jumbotron text-center'>
						<h2>Loading...</h2>
					</div>
				) : (
					""
				)}
				<form>
					<div className='form-group'>
						<label className='text-muted'>Email</label>
						<input
							onChange={this.handleChange("email")}
							type='email'
							className='form-control'
							value={this.state.email}
						/>
					</div>
					<div className='form-group'>
						<label className='text-muted'>Password</label>
						<input
							onChange={this.handleChange("password")}
							type='password'
							className='form-control'
							value={this.state.password}
						/>
					</div>
					<button
						onClick={this.clickSubmit}
						className='btn btn-raised btn-primary'>
						Signin
					</button>
				</form>
			</div>
		);
	}
}

export default Signin;
