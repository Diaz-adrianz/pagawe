import bcrypt from 'bcrypt';
import session from 'express-session';
import { Tokens, Users } from '../database/models.js';
import { generateAuthToken, handleErrors } from './helpers.js';

const AuthCtrl = {
	getId: async (req, res) => {
		res.status(200).json({
			status: 'success',
			pesan: 'Ini user anda',
			data: req.session.uid,
			isAdmin: req.session.role,
		});
	},
	isAdmin: async (req, res, next) => {
		if (req.session.uid) {
			if (req.session.role == 'admin') {
				next();
			} else {
				res.status(403).json({
					status: 'warning',
					pesan: 'Ruang khusus admin!',
				});
			}
		} else {
			res.status(403).json({
				status: 'warning',
				pesan: 'Login terlebih dahulu!',
			});
		}
	},
	isUser: async (req, res, next) => {
		if (req.session.uid) {
			if (req.session.role == 'user') {
				next();
			} else {
				res.status(403).json({
					status: 'warning',
					pesan: 'Ruang khusus user!',
				});
			}
		} else {
			res.status(403).json({
				status: 'warning',
				pesan: 'Login terlebih dahulu!',
			});
		}
	},
	middleWare: async (req, res, next) => {
		try {
			let uid = req.session.uid;

			if (!uid) {
				res.status(403).json({
					status: 'warning',
					pesan: 'Login terlebih dahulu!',
				});
				return false;
			}

			let user = await Users.findById(uid);

			if (!user) {
				res.status(404).json({
					status: 'warning',
					pesan: 'User tidak ditemukan',
				});
				return false;
			}

			next();
		} catch (error) {
			let errors = handleErrors(error);

			res.status(errors.status).json({
				status: 'danger',
				pesan: errors.pesan,
			});
		}
	},
	login: async (req, res) => {
		const { email, password } = req.body;

		try {
			let user = await Users.findOne({
				email,
			});

			if (!user || user == {}) {
				res.status(404).json({
					status: 'warning',
					pesan: 'Email tidak ditemukan!',
				});

				return false;
			}

			if (user.password != password) {
				res.status(400).json({
					status: 'warning',
					pesan: 'Password salah!',
				});
				return false;
			}

			let session = req.session;
			session.uid = user._id;
			session.role = user.role;

			res.status(200).json({
				status: 'success',
				pesan: `Selamat datang ${user.nama}!`,
				peran: user.role,
			});
		} catch (error) {
			let errors = handleErrors(error);

			res.status(errors.status).json({
				status: 'danger',
				pesan: errors.pesan,
			});
		}
	},
	logout: async (req, res) => {
		req.session.destroy();

		res.status(200).json({
			status: 'success',
			pesan: 'Selamat tinggal',
		});
	},
};

export default AuthCtrl;
