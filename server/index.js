import express from 'express';
import dotenv from 'dotenv';
import { graphqlHTTP } from 'express-graphql';
import schema from './schema/schema.js'
import { connectDB } from './config/db.js';
dotenv.config();

const port = process.env.PORT || 5000;

const app = express();

//connectDB
connectDB();

app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: process.env.NODE_ENV === 'development'
}))

app.listen(port, console.log(`SERVER RUNNING ${port}`))
