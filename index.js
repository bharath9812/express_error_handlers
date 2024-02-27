const express = require('express');
const app = express();
const morgan = require('morgan');

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
    throw new Error('Pwd Needed');
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


//error 404 route
app.use((req, res) => {
    res.status(404).send("Not found"); //we can a flashy page with a emoji or something that saying non found;
    
})

app.use((err, req, res, next) => {
    console.log('ERROR'); // wihtout next() down below /error or /secret(without pwdd) route is accessed the page will infinitely reloads and in console 'ERROR' will be printed
    // res.status(500).send('See ya later')
    console.log(err); // this prints out the error which be it either /error or /secret
    next(err);//builtin error handler and next(err) calls next error handling middleware unlike next() which calls next matching middle ware/next route that is matching
})

app.listen(3000, () => {
    console.log('Peekin at 3000 boss');
})