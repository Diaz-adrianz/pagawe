import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

function Headerr(props) {
	const navigate = useNavigate();
	const { items, logoutbtn, addonbtns } = props;

	const logout = async () => {
		try {
			const res = await axios.delete('http://localhost:5000/logout');

			if (res.data.status == 'success') {
				navigate('/');
			}
		} catch (error) {
			if (error.response) {
				console.log(error.response);
			}
		}
	};
	return (
		<ul className="nav nav-pills py-2 px-3 bg-dark">
			{items.map((item, index) => {
				return (
					<li key={index} className="nav-item">
						<Link className={`nav-link py-1 fw-bold ${item.on ? 'active' : ''}`} to={'/' + item.to}>
							{item.initial}
						</Link>
					</li>
				);
			})}
			{addonbtns
				? addonbtns.map((item, index) => {
						return (
							<li key={index} className="nav-item">
								<button className="nav-link py-1 fw-bold" data-bs-toggle={item.action} data-bs-target={item.target}>
									{item.initial}
								</button>
							</li>
						);
				  })
				: ''}
			{logoutbtn ? (
				<li className="nav-item ms-auto">
					<button onClick={logout} className="nav-link text-danger py-1 d-flex">
						<i className="material-icons m-auto">logout</i>
					</button>
				</li>
			) : (
				''
			)}
		</ul>
	);
}

export default Headerr;
