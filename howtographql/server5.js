var express = require('express');
var graphqlHTTP = require('express-graphql');
var { buildSchema } = require('graphql');

var scheme = buildSchema(`
    type Query {
        id: String
    }
`);

const loggingMiddleware = (req, res, next) => {
    console.log('id: ', req.ip);

    next();
};

var root = {
    ip: (args, req) => {
        return req.ip;
    }
};

var app = express();
app.use(loggingMiddleware);
app.use(
    '/graqhql',
    graphqlHTTP({
        schema: scheme,
        rootValue: root,
        graphiql: true
    })
);
app.listen(4000);
