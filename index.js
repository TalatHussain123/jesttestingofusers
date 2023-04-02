import express from 'express';
import userRoute from './routes/user.js';
import mongoose from 'mongoose';

const port = 5000
export const app = express();

mongoose.set('strictQuery', false)
const connect = async () => {
    try {
        await mongoose.connect("mongodb+srv://Jesttesting:gqoi4EyrbwWDPYdy@cluster0.lj9aoz4.mongodb.net/?retryWrites=true&w=majority", {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log("connected DB")
    } catch (err) {
        console.log("Error")
    }
}

app.use(express.json());
app.use('/api/user', userRoute);



app.listen(port, () => {
    connect();
    console.log("Back server is running", port)
})