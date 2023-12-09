const express = require('express');
const app = express();
const cors = require('cors');
const cookieParser = require('cookie-parser')

const { serverPort } = require('./src/services/envSecret');
const connectMongoDb = require('./src/config/connectDatabase');
 connectMongoDb()
const userRouter = require('./src/routes/userRoutes');
const authenticationRoute = require('./src/routes/authenticationRoutes');
const bannerSliderRouter = require('./src/routes/bannerSliderRoutes');
const categoryRoutes = require('./src/routes/categoryRoutes');
const brandRouter = require('./src/routes/brandRoutes');
const productRoute = require('./src/routes/productRoutes');
const shoppingCartRouter = require('./src/routes/shoppingCartRoutes');


// Middleware
app.use(
    cors({
        origin: ['http://localhost:5173','https://uminex-mern-app.web.app'],
        credentials: true,
        methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"]
    })
);
app.use(express.json());
app.use(cookieParser());

// router endpoing
app.use('/api/v1', userRouter);
app.use('/api/v1', authenticationRoute)
app.use("/api/v1", bannerSliderRouter)
app.use("/api/v1", categoryRoutes)
app.use("/api/v1", brandRouter)
app.use("/api/v1", productRoute)
app.use("/api/v1", shoppingCartRouter)


app.get('/', (req, res, next) => {
    res.send("Server running")
})


app.all('*', (req, res, next) => {
    res.send("Page not found , 404")
})


app.listen( serverPort ,  async ()  => {
    console.log(`Server is running at port http://localhost:${serverPort}`);
})