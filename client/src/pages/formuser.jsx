import { useNavigate, useParams } from 'react-router-dom';
import { dateFormatter } from '../assets/helpers';
import { useState, useEffect } from 'react';
import Headerr from '../../components/header';
import axios from 'axios';

function FormUser() {
	const navigate = useNavigate();
	const { id } = useParams();

	const navs = [
		{ to: '', initial: 'Home', on: false },
		{ to: 'admin', initial: 'Pegawai', on: true },
	];

	const [userId, setUserId] = useState('');
	const [nama, setNama] = useState('');
	const [email, setEmail] = useState('');
	const [role, setRole] = useState('');
	const [password, setPassword] = useState('');
	const [pekerjaan, setPekerjaan] = useState('');
	const [departemen, setDepartemen] = useState('');

	const [tweets, setTweets] = useState([]);

	const [alertMode, setAlertMode] = useState('success');
	const [alertMsg, setAlertMsg] = useState('Halo Admin!');

	const [yakinHapus, setYakinHapus] = useState(Boolean);

	useEffect(() => {
		document.title = 'Create User | PAGAWE';

		cekAuth();

		if (id != 'new') {
			document.title = 'Edit User | PAGAWE';

			getPegawai();
			getTweets();

			setYakinHapus(false);
		}
	}, []);

	const cekAuth = async (navigate) => {
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

	const getPegawai = async () => {
		try {
			const res = await axios.get(`http://localhost:5000/users/${id}`);
			const data = res.data.data;

			setAlertMode(res.data.status);
			setAlertMsg(res.data.pesan);

			if (data) {
				setUserId(data._id);
				setNama(data.nama);
				setEmail(data.email);
				setRole(data.role);
				setPassword(data.password);
				setPekerjaan(data.pekerjaan);
				setDepartemen(data.departemen);
			}
		} catch (error) {
			if (error.response) {
				setAlertMode(error.response.data.status);
				setAlertMsg(error.response.data.pesan);

				setTimeout(() => {
					navigate('/formuser/new');
				}, 1500);
			}
		}
	};

	const hapus = async (e) => {
		if (email == 'diaz@inagri.asia') {
			setAlertMode('danger');
			setAlertMsg('Super Admin tidak boleh dihapus!');

			return false;
		}
		if (yakinHapus) {
			try {
				const res = await axios.delete('http://localhost:5000/users/' + id);

				setAlertMode(res.data.status);
				setAlertMsg(res.data.pesan);

				if (res.data.status == 'success') {
					setTimeout(() => {
						navigate('/admin');
					}, 1500);
				}
			} catch (error) {
				if (error.response) {
					console.log(error.response);
					setToastMsg(error.response.data.pesan);
					setToastStatus(error.response.data.status);
				}
			}
		}

		setYakinHapus(true);
		setAlertMode('warning');
		setAlertMsg('Klik sekali lagi untuk melanjutkan');
	};

	const kirim = async (e) => {
		e.preventDefault();
		let send;
		const obj = { nama, email, password, role, pekerjaan, departemen };

		try {
			if (id != 'new') {
				console.log('yes');
				send = await axios.put('http://localhost:5000/users/' + id, JSON.stringify(obj), {
					headers: {
						'Content-Type': 'application/json',
					},
				});
			} else {
				send = await axios.post('http://localhost:5000/users', JSON.stringify(obj), {
					headers: {
						'Content-Type': 'application/json',
					},
				});
			}

			setAlertMsg(send.data.pesan);
			setAlertMode(send.data.status);

			if (send.data.status == 'success') {
				setTimeout(() => {
					navigate('/admin');
				}, 1500);
			}
		} catch (error) {
			if (error.response) {
				console.log(error.response);
				setAlertMsg(error.response.data.pesan);
				setAlertMode(error.response.data.status);
			}
		}
	};

	const getTweets = async () => {
		try {
			const res = await axios.get(`http://localhost:5000/tweets/${id}`);

			setTweets(res.data.data);
		} catch (error) {
			if (error.response) {
				console.log(error.response);
			}
		}
	};

	const setTweetMode = async (e) => {
		e.preventDefault();

		let elm = e.currentTarget;

		try {
			const tweetId = elm.getAttribute('data-id');
			const res = await axios.get('http://localhost:5000/tweetsmode/' + tweetId);

			if (elm.classList.contains('btn-secondary')) {
				elm.classList.remove('btn-secondary');
				elm.classList.add('btn-primary');
				elm.firstElementChild.textContent = 'public';
			} else if (elm.classList.contains('btn-primary')) {
				elm.classList.remove('btn-primary');
				elm.classList.add('btn-secondary');
				elm.firstElementChild.textContent = 'public_off';
			}
		} catch (error) {
			if (error.response) {
				console.log(error.response);
				setToastMsg(error.response.data.pesan);
				setToastStatus(error.response.data.status);
			}
		}
	};

	return (
		<>
			<Headerr items={navs} logoutbtn={true} addonbtns={false} />

			<main className="p-3">
				{/* FORM  */}
				<section id="pegawe" className="mb-3">
					<form
						action=""
						onSubmit={(e) => kirim(e)}
						style={{ maxWidth: 768 }}
						className="m-auto w-100 bg-white rounded-4 shadow border p-3"
					>
						<div className="d-flex">
							<h2 className="mb-3">Data User</h2>
							<div className={`alert alert-${alertMode} p-2 ms-auto`}>{alertMsg}</div>
						</div>

						{/* <!-- NAMA  --> */}
						<div className="form-floating mb-3">
							<input
								type="text"
								maxLength={64}
								className="form-control"
								id="nama"
								placeholder="n"
								value={nama}
								onChange={(e) => setNama(e.target.value)}
							/>
							<label htmlFor="nama">Nama</label>
						</div>

						{/* <!-- EMAIL  --> */}
						<div className="form-floating mb-3">
							<input
								type="email"
								maxLength={64}
								className="form-control"
								id="email"
								placeholder="n"
								value={email}
								onChange={(e) => setEmail(e.target.value)}
							/>
							<label htmlFor="email">Email</label>
						</div>

						{/* <!-- PASSWORD --> */}
						<div className="form-floating mb-3">
							<input
								type="password"
								maxLength={12}
								className="form-control"
								id="password"
								placeholder="n"
								value={password}
								onChange={(e) => setPassword(e.target.value)}
							/>
							<label htmlFor="password">Password</label>
						</div>

						{/* <!-- ROLE  --> */}
						<div className="form-floating mb-3">
							<select className="form-select" id="role" value={role} onChange={(e) => setRole(e.target.value)}>
								<option value="user">User</option>
								<option value="admin">Admin</option>
							</select>
							<label htmlFor="role">Role</label>
						</div>

						{/* <!-- PEKERJAAN  --> */}
						<div className="form-floating mb-3">
							<input
								type="text"
								maxLength={64}
								className="form-control"
								id="pekerjaan"
								placeholder="n"
								value={pekerjaan}
								onChange={(e) => setPekerjaan(e.target.value)}
							/>
							<label htmlFor="pekerjaan">Pekerjaan</label>
						</div>

						{/* <!-- DEPARTEMEN  --> */}
						<div className="form-floating mb-3">
							<input
								type="text"
								maxLength={64}
								className="form-control"
								id="departemen"
								placeholder="n"
								value={departemen}
								onChange={(e) => setDepartemen(e.target.value)}
							/>
							<label htmlFor="departemen">Departemen</label>
						</div>

						{/* <!-- BUTTONS --> */}
						<div className="d-flex gap-2 justify-content-end">
							{id != 'new' ? (
								<button onClick={(e) => hapus(e)} type="button" className="btn fw-bold btn-outline-danger ms-auto">
									Hapus User
								</button>
							) : (
								''
							)}
							<button type="submit" className="btn fw-bold btn-primary">
								Simpan
							</button>
						</div>
					</form>
				</section>

				{/* <!-- LIST CATATAN  --> */}
				<section id="notes" className="row row-cols-1 row-cols-md-2 row-cols-lg-4">
					{tweets.map((tweet, index) => {
						return (
							<div key={index} className="col">
								<div className="card shadow mb-3">
									<p className="card-body m-0">{tweet.teks}</p>
									<div className="card-footer align-items-center d-flex gap-2">
										{tweet.perasaan == 'murung' ? (
											<i className="material-icons text-danger">mood_bad</i>
										) : (
											<i className="material-icons text-primary">mood</i>
										)}
										<small className="text-muted ms-auto">{dateFormatter(tweet.tgl)}</small>
										{tweet.publik ? (
											<button
												onClick={(e) => setTweetMode(e)}
												data-id={tweet._id}
												className="btn btn-primary fw-bold py-1 d-flex"
											>
												<i className="material-icons">public</i>
											</button>
										) : (
											<button
												onClick={(e) => setTweetMode(e)}
												data-id={tweet._id}
												className="btn btn-secondary fw-bold py-1 d-flex"
											>
												<i className="material-icons">public_off</i>
											</button>
										)}
									</div>
								</div>
							</div>
						);
					})}
				</section>
			</main>
		</>
	);
}

export default FormUser;
