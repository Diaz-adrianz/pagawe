import mongoose from 'mongoose';

const skemaUsers = mongoose.Schema({
	nama: {
		type: String,
		required: [true, 'Kolom nama wajib diisi!'],
		lowercase: true,
	},
	email: {
		type: String,
		required: [true, 'Kolom email wajib diisi!'],
		unique: true,
	},
	password: {
		type: String,
		required: [true, 'Kolom password wajib diisi!'],
	},
	role: {
		type: String,
		enum: ['user', 'admin'],
		default: 'user',
	},
	pekerjaan: {
		type: String,
		required: [true, 'Kolom pekerjaan wajib diisi!'],
	},
	departemen: {
		type: String,
		required: [true, 'Kolom departemen wajib diisi!'],
	},
});

const skemaCuitan = mongoose.Schema({
	userId: {
		type: String,
	},
	nama: {
		type: String,
		required: [true, 'Kolom nama wajib diisi!'],
	},
	departemen: {
		type: String,
		required: [true, 'Kolom departemen wajib diisi!'],
	},
	tgl: {
		type: String,
		required: [true, 'Kolom tanggal wajib diisi!'],
	},
	teks: {
		type: String,
		required: [true, 'Kolom teks wajib diisi!'],
	},
	perasaan: {
		type: String,
		enum: ['senang', 'murung'],
	},
	publik: {
		type: Boolean,
	},
});

const skemaToken = mongoose.Schema({
	token: {
		type: String,
		unique: true,
	},
	userId: {
		type: String,
	},
	role: {
		type: String,
		lowercase: true,
	},
});

export const Users = mongoose.model('users', skemaUsers);
export const Cuitan = mongoose.model('cuitans', skemaCuitan);
export const Tokens = mongoose.model('tokens', skemaToken);
