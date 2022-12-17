import moment from 'moment';
import mongoose from 'mongoose';
import crypto from 'crypto';
const mongoId = mongoose.Types.ObjectId;

export const generateAuthToken = () => {
	return crypto.randomBytes(30).toString('hex');
};
export const mongoIdValidator = (id) => {
	if (mongoId.isValid(id)) {
		return String(new mongoId(id)) === id ? true : false;
	}

	return false;
};

export const currentDate = (selection = false, oldDate = false) => {
	let date, val;

	moment.locale('id');
	date = new moment();

	try {
		switch (selection) {
			case 'time':
				val = date.format('h-mm-ss');
				break;
			case 'year':
				val = date.format('YYYY');
				break;
			case 'convert':
				val = moment(oldDate).format('DD MMMM YYYY');
				break;
			case 'slash':
				val = date.format('MM/DD/YYYY');
				break;
			default:
				val = date.format('DD MMMM YYYY');
				break;
		}
		return val;
	} catch (err) {
		console.log('Just a warning');
	}
};

export const expiredDate = (date) => {
	return moment(date).isSameOrBefore(currentDate());
};

export const getMongoError = (err) => {
	if (err.name === 'ValidationError') {
		let errors = [];

		Object.keys(err.errors).forEach((key) => {
			errors.push({
				properti: key,
				pesan: err.errors[key].message,
			});
		});

		return {
			status: 400,
			pesan: errors,
		};
	} else if (err.name === 'MongoServerError' && err.code === 11000) {
		let errors = [];

		Object.keys(err.keyValue).forEach((key) => {
			errors.push(`Kolom ${key}: ${err.keyValue[key]} sudah ada`);
		});

		return {
			status: 422,
			pesan: errors,
		};
	}

	return false;
};

export const arraySpaceRemover = (val) => {
	let newVal = '';

	for (let i = 0; i < val.length; i++) {
		if (val[i] == ' ') continue;
		newVal += val[i];
	}

	return newVal;
};
export const handleErrors = (err) => {
	let mongoError = getMongoError(err);

	if (mongoError) {
		return {
			status: mongoError.status,
			data: false,
			pesan: mongoError.pesan[0],
		};
	}

	console.log(err);
	// REDIRECT to 500 page
	return {
		status: 500,
		pesan: 'Internal server error',
	};
};
