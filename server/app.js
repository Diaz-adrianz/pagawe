import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import session from 'express-session';
import { connectDB } from './database/db.js';
import router from './routers/router.js';

const app = express();
const port = process.env.PORT || 5000;

app.use(
	session({
		secret: 'msFN1oBWaWcwhuddF5TPuVBs2EqhxVyk',
		saveUninitialized: true,
		cookie: { maxAge: 1000 * 60 * 60 * 24 * 3 },
		resave: false,
	})
);

app.use(cors({ credentials: true, origin: 'http://localhost:5173' }));
app.use(cookieParser());
app.use(express.json());

connectDB();

app.use(router);

app.listen(port, () => console.log(`PAGAWE | listening on port: ${port}`));
