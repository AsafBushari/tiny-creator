const { port } = require('./config');
const createServer = require('./server');

const app = createServer();

app.listen(process.env.PORT || port, (err) => {
    if(err) console.log('The server failed to run');
    else console.log(`The server run on port ${port}`);
});

module.exports = app;