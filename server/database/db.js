import mongoose from 'mongoose';

// const atlas =
// 	'mongodb+srv://dazveloper:d4z-m0n9O4tL@cluster0.c76glns.mongodb.net/cobadulu?retryWrites=true&w=majority';
const lokal = 'mongodb://127.0.0.1:27017/pagawei';
const dockering = 'mongodb://mongodb:27017/newpagawei';

mongoose.set('strictQuery', false);

export const connectDB = async () => {
	try {
		const res = await mongoose.connect(dockering, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
		});
		console.log('Database Connected!');
	} catch (err) {
		console.log(err);
		return false;
	}
};
