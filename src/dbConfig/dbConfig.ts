import mongoose from 'mongoose';

// import 'dotenv/config';


export async function connectToDatabase() {
    try {

        await mongoose.connect(process.env.MONGO_URL!);

        const connection = mongoose.connection;

        // on successful connectionī
        connection.on('connected', () => {
            console.log('Connected to the database');
        });

        // if the connection throws an error
        connection.on('error', (err: any) => {
            console.log('MongoDB connection error occurred while connecting to the database');
            console.log(err.message);
            process.exit(1);
        });

    }
    catch (error) {
        console.log('Error connecting to the database');
        console.log(error);
    }
}