import dotenv from 'dotenv'
import connectToDB from './db.js'; 
import Order from './models/orderModel.js';
import User from './models/userModel.js';
import Product from './models/productModel.js';
import Users from './users.js';
import { data } from './Data.js';
import colors from 'colors'

dotenv.config();
connectToDB();


const importData = async () => {
    try {
        await Order.deleteMany();
        await User.deleteMany();
        await Product.deleteMany();

        const importUsers = await User.create(Users);
        const adminUser = importUsers[0]._id;

        const sampleProducts = data.map(item => ({
            ...item, 
            user: adminUser
        }));

        await Product.create(sampleProducts);

        console.log('Data Imported!'.green.inverse);
        process.exit();
    } catch (err) {
        console.error(`${err}`.red.inverse);
        process.exit(1);
    }
}

const destroyData= async()=>{
    try{

        await Order.deleteMany();
        await User.deleteMany();
        await Product.deleteMany();


    console.log('Data Destroyed!'.red.inverse);
        process.exit();
    } catch (err) {
        console.error(`${err}`.red.inverse);
        process.exit(1);
    }
} 


if (process.argv[2] === '-d') {
    destroyData();
} else {
    importData();
}
