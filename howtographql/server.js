var { graphql, buildSchema } = require('graphql');
var express = require('express');
var graphqlHTTP = require('express-graphql');

var schema = buildSchema(`
    type Query {
        hello: String,
        name: Int
    }
`);

var root = {
    hello: () => {
        return 'Hello world NongNo';
    },
    name: () => {
        return 2;
    }
};

var app = express();
app.use(
    '/graphql',
    graphqlHTTP({
        schema: schema,
        rootValue: root,
        graphiql: true
    })
);
app.listen(4000);
console.log('Running a GraphQL API server at localhost:4000/graphql');

/*
    {
        hello
    }


    fetch('/graphql', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
        body: JSON.stringify({query: "{ hello }"})
    })
    .then(r => r.json())
    .then(data => console.log('data returned:', data));
*/
