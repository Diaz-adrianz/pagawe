import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Headerr from '../../components/header';
import { dateFormatter } from '../assets/helpers';

function UserPage() {
	const navigate = useNavigate();
	const navs = [
		{ to: '', initial: 'Home', on: false },
		{ to: 'user', initial: 'Cuitan', on: true },
	];
	const navBtns = [{ initial: 'Profil', action: 'modal', target: '#modalprofile' }];

	const [userId, setUserId] = useState('');
	const [nama, setNama] = useState('');
	const [email, setEmail] = useState('');
	const [role, setRole] = useState('');
	const [pekerjaan, setPekerjaan] = useState('');
	const [departemen, setDepartemen] = useState('');

	const [tweets, setTweets] = useState([]);

	const [alertMode, setAlertMode] = useState('success');
	const [alertMsg, setAlertMsg] = useState(`Halo ${nama}!`);

	const [teks, setTeks] = useState('');

	const [senang, setSenang] = useState(Boolean);

	useEffect(() => {
		document.title = 'Userpage | PAGAWE';

		cekAuth();
		getPegawai();
		getTweets();

		setSenang(true);
	}, []);

	const cekAuth = async () => {
		try {
			const res = await axios.get('http://localhost:5000/uid');

			if (res.data.status == 'success') {
				res.data.isAdmin != 'user' ? navigate('/login') : null;
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
			const res = await axios.get(`http://localhost:5000/user`);
			const data = res.data.data;

			if (data) {
				setUserId(data._id);
				setNama(data.nama);
				setEmail(data.email);
				setRole(data.role);
				setPekerjaan(data.pekerjaan);
				setDepartemen(data.departemen);

				setAlertMsg(`Halo ${nama}!`);
			}
		} catch (error) {
			if (error.response) console.log(error.response.data);
		}
	};

	const getTweets = async () => {
		try {
			const res = await axios.get(`http://localhost:5000/tweet`);

			setTweets(res.data.data);
		} catch (error) {
			if (error.response) {
				console.log(error.response);
			}
		}
	};

	const deleteTweet = async (e, index) => {
		e.preventDefault();

		try {
			const tweetId = tweets[index]._id;
			const res = await axios.delete('http://localhost:5000/tweets/' + tweetId);

			setAlertMode(res.data.status);
			setAlertMsg(res.data.pesan);

			getTweets();
		} catch (error) {
			if (error.response) {
				setToastMsg(error.response.data.pesan);
				setToastStatus(error.response.data.status);
			}
		}
	};

	const kirim = async (e) => {
		e.preventDefault();

		let obj = {
			nama,
			departemen,
			teks,
			perasaan: senang ? 'senang' : 'murung',
			publik: false,
		};
		try {
			const res = await axios.post('http://localhost:5000/tweets', JSON.stringify(obj), {
				headers: {
					'Content-Type': 'application/json',
				},
			});

			setAlertMsg(res.data.pesan);
			setAlertMode(res.data.status);

			getTweets();
		} catch (error) {
			if (error.response) {
				console.log(error.response.data);
				setAlertMsg(error.response.data.pesan);
				setAlertMode(error.response.data.status);
			}
		}
	};

	return (
		<>
			<Headerr items={navs} logoutbtn={true} addonbtns={navBtns} />
			<main className="p-3">
				{/* <!-- CATATAN BARU  --> */}
				<section id="newnote" className="d-flex flex-column  mb-5">
					<div className={`alert alert-${alertMode} p-2 m-auto mb-3`}>{alertMsg}</div>

					<form onSubmit={(e) => kirim(e)} className="card m-auto w-100" style={{ maxWidth: 500 }}>
						<textarea
							className="form-control card-body"
							rows="3"
							style={{ resize: 'none' }}
							value={teks}
							onChange={(e) => setTeks(e.target.value)}
							placeholder="Bagaimana hari ini?"
						></textarea>
						<div className="card-footer gap-2 align-items-center d-flex">
							<i
								onClick={(e) => setSenang(true)}
								style={{ cursor: 'pointer' }}
								className={`material-icons ${senang ? 'text-primary' : 'text-secondary'} `}
							>
								mood
							</i>
							<i
								onClick={(e) => setSenang(false)}
								style={{ cursor: 'pointer' }}
								className={`material-icons ${!senang ? 'text-danger' : 'text-secondary'} `}
							>
								mood_bad
							</i>
							<button type="submit" className="btn fw-bold ms-auto btn-primary py-1">
								simpan
							</button>
						</div>
					</form>
				</section>

				{/* <!-- LIST CATATAN  --> */}
				<section id="notes" className="row row-cols-1 row-cols-md-2 row-cols-lg-4">
					{tweets.map((tweet, index) => {
						return (
							<div key={index} className="col">
								<div className="card mb-3 shadow">
									<p className="card-body m-0">{tweet.teks}</p>
									<div className="card-footer align-items-center d-flex gap-2">
										{tweet.publik ? (
											<i className="material-icons text-primary">public</i>
										) : (
											<i className="material-icons text-secondary">public_off</i>
										)}
										{tweet.perasaan == 'murung' ? (
											<i className="material-icons text-danger">mood_bad</i>
										) : (
											<i className="material-icons text-primary">mood</i>
										)}

										<small className="text-muted ms-auto">{dateFormatter(tweet.tgl)}</small>
										<button
											onClick={(e) => deleteTweet(e, index)}
											className="btn btn-outline-danger border-0 p-1 d-flex"
										>
											<i className="m-auto material-icons fs-5">delete</i>
										</button>
									</div>
								</div>
							</div>
						);
					})}
				</section>

				{/* <!-- MODAL PROFILE --> */}
				<div
					className="modal fade"
					id="modalprofile"
					data-bs-backdrop="static"
					data-bs-keyboard="false"
					tabIndex={-1}
					aria-labelledby="staticBackdropLabel"
					aria-hidden="true"
				>
					<div className="modal-dialog">
						<div className="modal-content">
							<div className="modal-header">
								<h1 className="modal-title fs-5 text-primary text-shadow" id="staticBackdropLabel">
									Profil
								</h1>
							</div>
							<div className="modal-body">
								<table className="table">
									<tbody>
										<tr>
											<th scope="row" className="fw-bold">
												Nama
											</th>
											<td>: {nama}</td>
										</tr>
										<tr>
											<th scope="row" className="fw-bold">
												Email
											</th>
											<td>: {email}</td>
										</tr>
										<tr>
											<th scope="row" className="fw-bold">
												Role
											</th>
											<td>: {role}</td>
										</tr>
										<tr>
											<th scope="row" className="fw-bold">
												Pekerjaan
											</th>
											<td>: {pekerjaan}</td>
										</tr>
										<tr>
											<th scope="row" className="fw-bold">
												Departemen
											</th>
											<td>: {departemen}</td>
										</tr>
									</tbody>
								</table>
							</div>
							<div className="modal-footer p-1">
								<button type="button" className="btn fw-bold btn-outline-danger border-0 w-100" data-bs-dismiss="modal">
									Tutup
								</button>
							</div>
						</div>
					</div>
				</div>
			</main>
		</>
	);
}

export default UserPage;
