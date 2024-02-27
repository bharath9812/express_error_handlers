const express = require('express');
const app = express();
const morgan = require('morgan');

const ExpError = require('./ExpError');
app.use(morgan('tiny'));

app.use((req, res, next) => {
    req.requestTime = Date.now();
    console.log(req.method, req.path);
    next();
})




const verifyPwd = ((req, res, next) => {
    const { pwd } = req.query;
    if (pwd === 'opensesame') {
        next();
    }
    // res.send("PWD Needed!!");
    // res.status(401);
    // throw new Error('Pwd Needed');
    throw new ExpError('pwd needed', 401);
})


app.get('/', (req, res) => {
    console.log(`Requested Date: ${req.requestTime}`);
    res.send('basic route');
})

app.get('/error', (req, res) => {
    web.fry();
})


app.get('/secret', verifyPwd, (req, res) => {
    // console.log(`Requested Date: ${req.requestTime}`);
    res.send('Bank Balance: -1$');
})


app.get('/admin', (req, res) => {
    throw new ExpError('Not an Admin BYe--!', 403);
})


//error 404 route
app.use((req, res) => {
    res.status(404).send("Not found"); //we can a flashy page with a emoji or something that saying non found;
    
})

// app.use((err, req, res, next) => {
//     console.log('ERROR'); // wihtout next() down below /error or /secret(without pwdd) route is accessed the page will infinitely reloads and in console 'ERROR' will be printed
//     // res.status(500).send('See ya later')
//     // err.stack (contains the body to threw error),err.status,err.headers
//     console.log(err); // this prints out the error which be it either /error or /secret
//     next(err);//builtin error handler and next(err) calls next error handling middleware unlike next() which calls next matching middle ware/next route that is matching
// })

// Our custome error class
app.use((err, req, res, next) => {
    const { status = 500, message = 'Something check out' } = err; //default status = 500; and msg = 'something.....'
    res.status(status).send(message); // only works for those routes where we defined ExpError custom errors because 
    // /error doesnot access status if dont have default status code
})


app.listen(3000, () => {
    console.log('Peekin at 3000 boss');
})