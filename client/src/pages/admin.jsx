import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Headerr from '../../components/header';

function AdminPage() {
	const navigate = useNavigate();
	const navs = [
		{ to: '', initial: 'Home', on: false },
		{ to: 'admin', initial: 'Pegawai', on: true },
	];

	const [pegawai, setPegawai] = useState([]);

	const [alertMode, setAlertMode] = useState('success');
	const [alertMsg, setAlertMsg] = useState('Halo Admin!');

	useEffect(() => {
		document.title = 'Admin | PAGAWE';

		cekAuth();
		getPegawai();
	}, []);

	const cekAuth = async () => {
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
			const res = await axios.get('http://localhost:5000/users');

			setPegawai(res.data.data);
		} catch (error) {
			if (error.response) console.log(error.response.data);
		}
	};

	return (
		<>
			<Headerr items={navs} logoutbtn={true} addonbtns={false} />
			<main className="p-3">
				<section id="pegawe">
					<div className="d-flex">
						<div className={`alert alert-${alertMode} p-2`}>{alertMsg}</div>
						<Link
							to="/formuser/new"
							className="btn btn-primary d-inline-flex align-items-center mb-3 fw-bold ms-auto gap-2"
						>
							<i className="material-icons fs-4">add_circle_outline</i>
							Baru
						</Link>
					</div>

					<div className="table-responsive">
						<table className="table bg-white table-bordered shadow table-hover rounded-4">
							<thead>
								<tr className="text-center">
									<th scope="col">Aksi</th>
									<th scope="col">Nama</th>
									<th scope="col">Email</th>
									<th scope="col">Role</th>
									<th scope="col">Password</th>
									<th scope="col">Pekerjaan</th>
									<th scope="col">Departemen</th>
								</tr>
							</thead>
							<tbody>
								{pegawai.map((person, index) => {
									return (
										<tr key={index}>
											<th scope="row">
												<Link to={'/formuser/' + person._id} className="btn btn-outline-primary border-0 p-1 d-flex">
													<i className="material-icons m-auto fs-4">visibility</i>
												</Link>
											</th>
											<td>{person.nama}</td>
											<td>{person.email}</td>
											<td>{person.role}</td>
											<td>{person.password}</td>
											<td>{person.pekerjaan}</td>
											<td>{person.departemen}</td>
										</tr>
									);
								})}
							</tbody>
						</table>
					</div>
				</section>
			</main>
		</>
	);
}

export default AdminPage;
