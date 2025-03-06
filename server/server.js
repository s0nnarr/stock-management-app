const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const userRouter = require('./routes/userRoute')
const alertRouter = require('./routes/alertRoute')
const companyRouter=require('./routes/companyRoute')
const inventoryRouter = require('./routes/inventoryRoute'); 
const orderRouter = require('./routes/orderRoute');

const app = express()
const PORT = 8080 || process.env.PORT;

//Middleware
app.use(cors({
    origin: ['http://localhost:5173'],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE']
}))
app.use(express.json({ limit: '50mb' }))
app.use(cookieParser())


//MongoDB
mongoose.connect(process.env.DB_URI)
    .then(() => {
        console.log('Connected to MongoDB Atlas');
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    })
    .catch((error) => {
        console.error('Error connecting to MongoDB Atlas: ', error);
    });

//Routes
app.use('/user', userRouter)
app.use('/alert', alertRouter)
app.use('/company',companyRouter)
app.use('/inventory', inventoryRouter)
app.use('/order', orderRouter)

