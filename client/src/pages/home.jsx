import axios from 'axios';
import { useEffect, useState } from 'react';
import Headerr from '../../components/header';
import { dateFormatter } from '../assets/helpers';

function Homepage() {
	const navs = [
		{ to: '', initial: 'Home', on: true },
		{ to: 'user', initial: 'Cuitan', on: false },
	];
	const navBtns = [{ initial: 'Profil', action: 'modal', target: '#modalprofile' }];

	const [tweets, setTweets] = useState([]);

	useEffect(() => {
		document.title = 'Home | PAGAWE';
		getTweets();
	}, []);

	const getTweets = async () => {
		try {
			const res = await axios.get('http://localhost:5000/tweetspublic');

			setTweets(res.data.data);
		} catch (error) {
			if (error.response) {
				console.log(error.response);
			}
		}
	};
	return (
		<>
			<Headerr items={navs} logoutbtn={false} addonbtns={navBtns} />
			<section
				id="banner"
				className="row w-100 m-0 p-3 align-items-center bg-white border-bottom row-cols-1 row-cols-md-2"
			>
				<div className="col mb-5">
					<div className="d-flex">
						<img className="m-auto w-75" src="/ilus.png" alt="" />
					</div>
				</div>
				<div className="col">
					<h1 className="fw-bold mb-5 border border-3 rounded-2 border-primary p-3" style={{ fontSize: 4 + 'rem' }}>
						Pegawai Sehat, <br /> Bisnis Pun Sehat!
					</h1>
					<img style={{ width: 250 }} src="/logo.png" alt="" />
				</div>
			</section>

			<main className="p-3 overflow-hidden">
				<h1 className="mb-3 mt-3 text-dark" style={{ fontSize: 4 + 'rem' }}>
					Apa Kata Mereka?
				</h1>
				<section id="notes" className="row row-cols-1 row-cols-md-2 row-cols-lg-4">
					{tweets.map((tweet, index) => {
						return (
							<div key={index} className="col">
								<div className="card shadow mb-3">
									<div className="card-body">
										<p>{tweet.teks}</p>
										<h6 className="m-0 small">
											~ {tweet.nama} | {tweet.departemen}
										</h6>
									</div>
									<div className="card-footer align-items-center d-flex gap-2">
										{tweet.perasaan == 'murung' ? (
											<i className="material-icons text-danger">mood_bad</i>
										) : (
											<i className="material-icons text-primary">mood</i>
										)}
										<small className="text-muted ms-auto">{dateFormatter(tweet.tgl)}</small>
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

export default Homepage;
