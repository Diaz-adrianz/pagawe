import axios from 'axios';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Headerr from '../../components/header';

function LoginPage() {
	const navigate = useNavigate();
	const navs = [
		{ to: '', initial: 'Home', on: false },
		{ to: 'user', initial: 'Cuitan', on: false },
		{ to: 'user', initial: 'Profil', on: true },
	];

	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const [alertMode, setAlertMode] = useState('info');
	const [alertMsg, setAlertMsg] = useState('Menunggu nilai masuk...');

	useEffect(() => {
		document.title = 'Login | PAGAWE';

		cekAuth();
	}, []);

	const cekAuth = async () => {
		try {
			const res = await axios.get('http://localhost:5000/uid');

			if (res.data.status == 'success') {
				res.data.isAdmin != 'user' ? navigate('/login') : navigate('/user');
			}
		} catch (error) {
			if (error.response) {
				console.log(error.response.data);
			}
		}
	};

	const kirim = async (e) => {
		e.preventDefault();

		try {
			const res = await axios.post('http://localhost:5000/login', JSON.stringify({ email, password }), {
				headers: {
					'Content-Type': 'application/json',
				},
			});

			setAlertMode(res.data.status);
			setAlertMsg(res.data.pesan);
			let peran = res.data.peran;
			console.log(res);

			if (res.data.status == 'success') {
				setTimeout(() => {
					return peran == 'admin' ? navigate('/admin') : navigate('/user');
				}, 1500);
			}
		} catch (error) {
			if (error.response) {
				setAlertMode(error.response.data.status);
				setAlertMsg(error.response.data.pesan);
			}
		}
	};

	return (
		<>
			<Headerr items={navs} logoutbtn={false} addonbtns={false} />
			<main className="row m-0 align-items-center row-cols-1 row-cols-md-2 p-3">
				<div className="col mb-5">
					<form
						onSubmit={(e) => kirim(e)}
						className="bg-white rounded-4 mt-5 border shadow m-auto p-3 d-flex flex-column w-100"
						style={{ maxWidth: 400 }}
					>
						<h2 className="mb-3">Login</h2>
						<div className={`alert alert-${alertMode} p-2`}>{alertMsg}</div>
						<div className="mb-3">
							<label htmlFor="email" className="form-label">
								Email address
							</label>
							<input
								type="email"
								className="form-control"
								id="email"
								placeholder="example@inagri.asia"
								value={email}
								onChange={(e) => setEmail(e.target.value)}
							/>
						</div>
						<div className="mb-3">
							<label htmlFor="password" className="form-label">
								Password
							</label>
							<input
								type="password"
								className="form-control"
								id="password"
								placeholder="example123"
								value={password}
								onChange={(e) => setPassword(e.target.value)}
							/>
						</div>
						<button type="submit" className="btn btn-primary fw-bold py-2">
							Masuk
						</button>
					</form>
				</div>
				<div className="col">
					<div className="d-flex">
						<img className="m-auto w-75" src="/ilus.png" alt="" />
					</div>
				</div>
			</main>
		</>
	);
}

export default LoginPage;
