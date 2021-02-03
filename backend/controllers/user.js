const _ = require("lodash");
const User = require("../models/user");

exports.userById = (req, res, next, id) => {
	User.findById(id)
		.then((user) => {
			if (!user) {
				return res.status(401).json({ error: "user not found." });
			}
			req.profile = user; // adds profile object to req with user info
			next();
		})
		.catch((err) => {
			console.log(err);
		});
};

exports.hasAuthorization = (req, res, next) => {
	const authorized =
		req.profile && req.auth && req.profile._id === req.auth._id;

	if (!authorized) {
		return res.status(403).json({
			error: "User is not authorized to perform this action",
		});
	}
	next();
};

exports.allUsers = (req, res, next) => {
	User.find()
		.select("name email")
		.then((users) => {
			return res.status(200).json({ users: users });
		})
		.catch((err) => {
			console.log(err);
		});
};

exports.getUser = (req, res, next) => {
	const user = {
		name: req.profile.name,
		_id: req.profile._id,
		created: req.profile.created,
		email: req.profile.email,
	};
	return res.status(200).json({ user: user });
};

exports.updateUser = (req, res, next) => {
	let user = req.profile;
	user = _.extend(user, req.body); // extend = it will mutate the source object
	user.updated = Date.now();
	user.save()
		.then((updatedUser) => {
			updatedUser.hashedPassword = undefined;
			updatedUser.salt = undefined;
			return res.status(200).json({ user: updatedUser });
		})
		.catch((err) => {
			console.log(err);
		});
};

exports.deleteUser = (req, res, next) => {
	let user = req.profile;
	console.log(user.email);
	User.deleteOne({ email: user.email })
		.then((result) => {
			return res.status(200).json({ message: "User deleted" });
		})
		.catch((err) => {
			console.log(err);
		});
};
