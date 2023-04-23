import mongoose from 'mongoose';

mongoose.set('strictQuery', false);

export const connectDB = async () => {
	try {
		const res = await mongoose.connect(process.env.MONGO_URI, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
		});
		console.log('Database Connected!');
	} catch (err) {
		console.log(err);
		return false;
	}
};
