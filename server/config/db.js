import mongoose from 'mongoose';

await mongoose.connect('mongodb://127.0.0.1:27017/mgmnt_db')

const connectDB = async () =>{
    console.log(`MongoDB Connected`)
}

export {connectDB}