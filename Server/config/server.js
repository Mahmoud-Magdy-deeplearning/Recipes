const express = require( 'express' );
const bodyParser = require( 'body-parser' );
const helmet = require( 'helmet' );

const server = express();
const { setRoutes } = require( './routes' );
const config = require( './config' ).getConfig();

server.use( helmet({      crossOriginResourcePolicy: false,}) );

const cors = require( 'cors' );

const corsOptions = {
    'origin': '*',
};

server.use( cors( corsOptions ) );
server.use( express.static(config.UPLOAD_PATH  ) );

server.use( bodyParser.json() );

// Setting up Routes
setRoutes( server );

module.exports = { server };
