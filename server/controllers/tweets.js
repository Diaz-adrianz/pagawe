import { currentDate, handleErrors, mongoIdValidator } from '../../../Pagawe/server/helpers/helpers.js';
import { Cuitan } from '../database/models.js';

const TweetCtrl = {
	create: async (req, res) => {
		try {
			let model = new Cuitan({
				...req.body,
				userId: req.session.uid,
				tgl: currentDate(),
			});

			await Cuitan.create(model);

			res.status(200).json({
				status: 'success',
				pesan: 'Cuitan berhasil ditambahkan!',
			});
		} catch (error) {
			let errors = handleErrors(error);

			res.status(errors.status).json({
				status: 'danger',
				pesan: errors.pesan,
			});
		}
	},
	getPublic: async (req, res) => {
		try {
			const data = await Cuitan.find({ publik: true }, { _id: false, userId: false, publik: false });

			res.status(200).json({
				status: 'success',
				pesan: `Ditemukan sebanyak ${data.length} cuitan`,
				data,
			});
		} catch (error) {
			const errors = handleErrors(error);

			res.status(errors.status).json({
				status: 'danger',
				pesan: errors.pesan,
			});
		}
	},
	get: async (req, res) => {
		const userId = req.params.id ? req.params.id : req.session.uid;

		if (!mongoIdValidator(userId)) {
			res.status(400).json({
				status: 'warning',
				pesan: 'ID tidak valid',
				data: [],
			});
		}

		try {
			const data = await Cuitan.find({ userId: userId });

			res.status(200).json({
				status: 'success',
				pesan: `Ditemukan sebanyak ${data.length} cuitan`,
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
	visibility: async (req, res) => {
		const id = req.params.id;

		if (!mongoIdValidator(id)) {
			res.status(400).json({
				status: 'warning',
				pesan: 'ID cuitan tidak valid!',
			});
		}

		try {
			let data = await Cuitan.findById(id);

			await Cuitan.findByIdAndUpdate(id, { publik: !data.publik });

			res.status(200).json({
				status: 'success',
				pesan: 'Mode cuitan telah diubah!',
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
				pesan: 'ID cuitan tidak valid!',
			});
		}

		try {
			await Cuitan.findOneAndDelete({ _id: id, userId: req.session.uid });

			res.status(200).json({
				status: 'success',
				pesan: 'Cuitan telah dihapus!',
			});
		} catch (error) {
			let errors = handleErrors(error);

			res.status(errors.status).json({
				status: 'danger',
				pesan: errors.pesan,
			});
		}
	},
};

export default TweetCtrl;
