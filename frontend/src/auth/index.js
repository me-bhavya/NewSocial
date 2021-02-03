export const signup = (user) => {
	return fetch(`${process.env.REACT_APP_API_URL}/signup`, {
		method: "POST",
		headers: {
			Accept: "application/json",
			"Content-Type": "application/json",
		},
		body: JSON.stringify(user),
	})
		.then((response) => {
			return response.json();
		})
		.catch((err) => {
			console.log(err);
		});
};

export const signin = (user) => {
	console.log(`${process.env}`);
	return fetch(`${process.env.REACT_APP_API_URL}/signin`, {
		method: "POST",
		headers: {
			Accept: "application/json",
			"Content-Type": "application/json",
		},
		body: JSON.stringify(user),
	})
		.then((response) => {
			return response.json();
		})
		.catch((err) => {
			console.log(err);
		});
};

export const authenticate = (jwt, cb) => {
	if (typeof window !== "undefined") {
		localStorage.setItem("jwt", JSON.stringify(jwt));
		cb();
	}
};

export const signout = (cb) => {
	if (typeof window !== "undefined") {
		localStorage.removeItem("jwt");
	}
	cb();
	return fetch(`${process.env.REACT_APP_API_URL}/signout`, {
		method: "GET",
	})
		.then((response) => {
			console.log(response);
			return response.json();
		})
		.catch((err) => {
			console.log(err);
		});
};

export const isAuthenticated = () => {
	if (typeof window == "undefined") {
		return false;
	}

	if (localStorage.getItem("jwt")) {
		return JSON.parse(localStorage.getItem("jwt"));
	} else {
		return false;
	}
};
