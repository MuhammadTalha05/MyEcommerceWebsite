const express = require("express");
const colors = require("colors");
const app = express();
const dotenv = require('dotenv');
const dbConnection = require('./Config/dbConnection');
const morgan = require("morgan");
const authRouting = require("./Routes/authRoutes");
const categoryRoutes = require('./Routes/categoryRoutes'); 
const productRoutes = require('./Routes/productRoutes');
const cors = require("cors");

app.use(cors());

app.use(express.json());
app.use(morgan('dev')); 

app.use('/auth', authRouting);
app.use('/category', categoryRoutes);
app.use('/product' , productRoutes);


dotenv.config();

const dbUsername = process.env.DB_USERNAME;
const dbPassword = process.env.DB_PASSWORD;

dbConnection(dbUsername, dbPassword )
const PORT = process.env.PORT || 9000;



app.listen(PORT , ()=>{
    console.log(`Port Is Listning on ${PORT}`.bgRed.white);
})