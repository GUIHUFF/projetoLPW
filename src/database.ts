import 'dotenv/config'
import mongoose from 'mongoose';

const connectDB = async () => {
  try{
    await mongoose.connect(`${process.env.DB_URL}`);
    return (true);
  }catch(err){
      console.log(err);
    return (false);
  }
}

export default connectDB;