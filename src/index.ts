/**
 * ***Use env variables***
 */
import dotenv from 'dotenv';
dotenv.config({
	path: '.env'
});

import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
//
import serverConfig from './config/server';
import databaseConfig from './config/database';
import database from './config/database';
import passport from './config/passport';
import { Errors } from './middleware/error';
import users from './routes/users';
import advs from './routes/adv';

const app = express();

/**
 * ***Set password strategy***
 */
passport();
/**
 * ***Database Connection***
 */
mongoose.Promise = global.Promise;
mongoose
	.connect(databaseConfig.url, database.settings)
	.then((success) => {
		console.log('Database connection');
	})
	.catch((err) => {
		console.log(`Database err: ${err}`);
	});

/** 
 * ***Middleware*** 
 */
app.use(
	bodyParser.urlencoded({
		extended: false
	})
);
app.use(bodyParser.json());

/**
 * ***Routes Config***
 */
app.use('/api/users', users());
app.use('/api/advs', advs());
/**
 * ***Errors Handling***
 */
app.use(Errors.notFound);
app.use(Errors.catchErrors);

/**
 * ***Server Connection***
 */
app.listen(serverConfig.port, () => {
	console.log(`Server is listen on port: ${serverConfig.port}`);
});
