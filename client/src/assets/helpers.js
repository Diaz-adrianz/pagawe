import moment from 'moment/moment';
import { useNavigate } from 'react-router-dom';

export const dateFormatter = (val) => {
	let date;
	moment.locale('id');

	try {
		date = moment(val).format('DD MMMM YYYY');
	} catch (err) {
		console.log('Just a warning');
	}
	return date;
};

export const cekAuth = async (navigate) => {
	try {
		const res = await axios.get('http://localhost:5000/uid');

		if (res.data.status == 'success') {
			res.data.isAdmin != 'admin' ? navigate('/login') : null;
		} else {
			navigate('/login');
		}
	} catch (error) {
		if (error.response) {
			navigate('/login');
		}
	}
};
