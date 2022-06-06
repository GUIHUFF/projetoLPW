import 'dotenv/config'
import mongoose from 'mongoose';
// mongo local: await mongoose.connect(`mongodb://${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`)
// mongo docker: await mongoose.connect(`mongodb://${process.env.DB_HOST}:${process.env.DB_PORT_LOCAL}/${process.env.DB_NAME}`)
// ambos em docker: mongoose.connect(`mongodb://${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`)  AS VARIAVEIS SÃO DIFERENTES NO .ENV
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