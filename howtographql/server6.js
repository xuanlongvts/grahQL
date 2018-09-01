// var express = require('express');
// var graphqlHTTP = require('express-graphql');
// var { buildSchema } = require('graphql');

// var schema = buildSchema(`
//     type User {
//         id: String
//         name: String
//     }

//     type Query {
//         user(id: String): User
//     }
// `);

// var fakeDb = {
//     a: {
//         id: 'a',
//         name: 'AAA'
//     },
//     b: {
//         id: 'b',
//         name: 'BBB'
//     }
// };

// var root = {
//     user: ({ id }) => {
//         return fakeDb[id];
//     }
// };

// var app = express();
// app.use(
//     '/graphql',
//     graphqlHTTP({
//         schema: schema,
//         rootValue: root,
//         graphiql: true
//     })
// );
// app.listen(4000);

/*******************************************************
    Cach 2    
*/
var express = require('express');
var graphqlHTTP = require('express-graphql');
var graphql = require('graphql');

var fakeDb = {
    a: {
        id: 'a',
        name: 'alice'
    },
    b: {
        id: 'b',
        name: 'bob'
    }
};

var userType = new graphql.GraphQLObjectType({
    name: 'User',
    fields: {
        id: {
            type: graphql.GraphQLString
        },
        name: {
            type: graphql.GraphQLString
        }
    }
});

var queryType = new graphql.GraphQLObjectType({
    name: 'Query',
    fields: {
        user: {
            type: userType,
            args: {
                id: {
                    type: graphql.GraphQLString
                }
            },
            resolve: (_, { id }) => {
                return fakeDb[id];
            }
        }
    }
});

var schema = new graphql.GraphQLSchema({
    query: queryType
});

var app = express();
app.use(
    '/graphql',
    graphqlHTTP({
        schema: schema,
        graphiql: true
    })
);
app.listen(4000);
