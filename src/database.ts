import 'dotenv/config'
import mongoose from 'mongoose';

const connectDB = async () => {
  await mongoose.connect(`mongodb://${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`)
  .then(() => {
    console.log('Conectado com o banco');
  })
  .catch((err: Error) => {
    console.log(err);
  });
}

export default connectDB;