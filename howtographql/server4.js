var express = require('express');
var graphqlHTTP = require('express-graphql');
var { buildSchema } = require('graphql');

var schema = buildSchema(`
    input MessageInput {
        content: String
        author: String
    }

    type Message {
        id: ID!
        content: String
        author: String
    }

    type Query {
        getMessage(id: ID!): Message
    }

    type Mutation {
        createMessage(input: MessageInput): Message
        updateMessage(id: ID!, input: MessageInput): Message
    }
`);

class Message {
    constructor(id, { content, author }) {
        this.id = id;
        this.content = content;
        this.author = author;
    }
}

var fakeDb = {};

var root = {
    getMessage: ({ id }) => {
        if (!fakeDb[id]) {
            throw new Error('No message exits with id: ' + id);
        }

        return new Message(id, fakeDb[id]);
    },

    createMessage: ({ input }) => {
        var id = require('crypto')
            .randomBytes(10)
            .toString('hex');

        fakeDb[id] = input;
        return new Message(id, input);
    },

    updateMessage: ({ id, input }) => {
        if (!fakeDb[id]) {
            throw new Error('No message exits with id: ' + id);
        }

        fakeDb[id] = input;
        return new Message(id, input);
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
app.listen(4000, () => {
    console.log('Running a GraphQL API server at localhost:4000/graphql');
});

/*
mutation {
    createMessage(
        input: {
        author: "andy",
        content: "hope is a good thing",
        }
    ) { id }
}


var author = 'andy';
var content = 'hope is a good thing';
var query = `mutation CreateMessage($input: MessageInput) {
  createMessage(input: $input) {
    id
  }
}`;

fetch('/graphql', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
    },
    body: JSON.stringify({
        query,
        variables: {
            input: {
                author,
                content
            }
        }
    })
})
    .then(r => r.json())
    .then(data => console.log('data returned:', data));
*/
