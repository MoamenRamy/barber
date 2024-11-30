require('dotenv').config();

const express = require("express");
const app = express();
const cors = require("cors");
const errorController = require("./controllers/errorController");
const authRouter = require('./routers/authRouter');
const packageRouter = require('./routers/packageRouter');
const barberRouter = require('./routers/barberRouter');
const userRouter = require('./routers/userRouter');
app.use(express.json());

app.use(cors());

app.use('/api/auth' ,authRouter );
app.use('/api/packages',packageRouter);
app.use("/api/barbers",barberRouter);
app.use("/api/users",userRouter);

// Serve static files from the 'public' directory
app.use('/barbers/photos', express.static('public/photos'));
app.use('/users/photos', express.static('./public/users', {
    fallthrough: false, // Ensures 404 for missing files
    setHeaders: (res) => {
        res.set('Cache-Control', 'no-store');
    }
}));
app.use('packages/photos', express.static('public/packages'));


// test 
function getJsonData() {
    return { data: 1234 };
}

// إعداد مسار API
app.get('/api/data', (req, res) => {
    res.json(getJsonData());
});
// end test

app.all("*",(req,res,next)=>{
    res.status(404).json({
        message: "wrong URL",
    });
});
app.use(errorController);
module.exports=app;