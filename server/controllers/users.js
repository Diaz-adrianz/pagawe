import { handleErrors, mongoIdValidator } from '../../../Pagawe/server/helpers/helpers.js';
import { Cuitan, Users } from '../database/models.js';

const UsersCtrl = {
	create: async (req, res) => {
		try {
			let model = new Users({
				...req.body,
			});

			await Users.create(model);

			res.status(200).json({
				status: 'success',
				pesan: 'User berhasil ditambahkan!',
			});
		} catch (error) {
			let errors = handleErrors(error);

			res.status(errors.status).json({
				status: 'danger',
				pesan: errors.pesan,
			});
		}
	},
	getMany: async (req, res) => {
		try {
			const data = await Users.find();

			res.status(200).json({
				status: 'success',
				pesan: `Ditemukan sebanyak ${data.length} pengguna`,
				user: req.uid,
				data,
			});
		} catch (error) {
			let errors = handleErrors(error);

			res.status(errors.status).json({
				status: 'danger',
				pesan: errors.pesan,
				data: [],
			});
		}
	},
	getONe: async (req, res) => {
		const id = req.params.id ? req.params.id : req.session.uid;

		if (!mongoIdValidator(id)) {
			res.status(400).json({
				status: 'warning',
				pesan: 'ID user tidak valid!',
				user: req.uid,
				data: {},
			});
			return false;
		}

		try {
			const data = await Users.findById(id);

			if (data) {
				res.status(200).json({
					status: 'success',
					pesan: 'Data user ditemukan!',
					user: req.uid,
					data,
				});
			} else {
				res.status(404).json({
					status: 'danger',
					pesan: 'Data user tidak ditemukan!',
					user: req.uid,
					data: {},
				});
			}
		} catch (error) {
			let errors = handleErrors(error);

			res.status(errors.status).json({
				status: 'danger',
				pesan: errors.pesan,
				data: {},
			});
		}
	},
	update: async (req, res) => {
		const id = req.params.id;

		if (!mongoIdValidator(id)) {
			res.status(404).json({
				status: 'warning',
				pesan: 'ID user tidak valid!',
			});
			return false;
		}

		try {
			await Users.findByIdAndUpdate(id, { ...req.body });

			res.status(200).json({
				status: 'success',
				pesan: 'Perubahan user telah disimpan!',
			});
		} catch (error) {
			let errors = handleErrors(error);

			res.status(errors.status).json({
				status: 'danger',
				pesan: errors.pesan,
			});
		}
	},
	delete: async (req, res) => {
		const id = req.params.id;

		if (!mongoIdValidator(id)) {
			res.status(400).json({
				status: 'warning',
				pesan: 'ID user tidak valid!',
			});
			return false;
		}

		try {
			await Users.findByIdAndDelete(id);
			await Cuitan.deleteMany({ userId: id });

			res.status(200).json({
				status: 'success',
				pesan: 'User dan cuitannya telah dihapus!',
			});
		} catch (err) {
			let errors = handleErrors(err);

			res.status(errors.status).json({
				status: 'danger',
				pesan: errors.pesan,
			});
		}
	},
};

export default UsersCtrl;
