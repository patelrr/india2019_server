// Import packages
const express = require('express');
const bodyParser = require('body-parser');
const cluster = require('cluster');
var cors = require('cors');
var path = require('path');

const routes = require('../routes');

const app = express();

// Run server on cluster so even if server crashes it auto restarts.
if (cluster.isMaster) {
    cluster.fork();
    cluster.fork();

    cluster.on('exit', (worker, code, signal) => {
        console.log('worker %d died (%s). restarting...',
            worker.process.pid, signal || code);
        cluster.fork();
    });
} else if (cluster.isWorker) {
    const child = express();

    // Allow cors
    child.use(cors());
    // Convert request body object into json
    child.use(bodyParser.json());
    child.use(bodyParser.urlencoded({ extended: true }));

    // Serve the client contents
    child.use('/', express.static(path.join(__dirname, '../client/build')));

    // Serve the api route
    child.use('/api', routes);

    // Set port
    child.set('port', process.env.PORT || 8080);
    // Set mode
    child.set('env', process.env.MODE || 'development');

    // Listen on the port
    child.listen(child.get('port'), () => {
        console.log(`App is running at http://localhost: ${child.get('port')} in ${child.get('env')} mode`);
        console.log("child running on port : ", child.get('port'));
    });
}

module.exports = app;