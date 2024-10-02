import { connect } from 'mongoose';

console.log(connect);

const connectDB = async () => {
    await connect(
        'mongodb+srv://namastedev:4D6ZO8RQuKJw63yb@namastenode.tcetj.mongodb.net/devTinder'
    );
}

export default connectDB;
