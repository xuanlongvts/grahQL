var express = require('express');
var graphqlHTTP = require('express-graphql');
var { buildSchema } = require('graphql');

var schema = buildSchema(`
    type Query {
        rollDice(numDice: Int!, numSides: Int): [Int]
    }
`);

var root = {
    rollDice: ({ numDice, numSides }) => {
        let output = [];
        for (let i = 0; i < numDice; i++) {
            output.push(1 + Math.floor(Math.random() * (numSides || 6)));
        }

        return output;
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

/*
{
  rollDice(numDice: 3, numSides: 6)
}


var dice = 3;
var sides = 6;
var query = `query RollDice($dice: Int!, $sides: Int) {
  rollDice(numDice: $dice, numSides: $sides)
}`;

fetch('/graphql', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
  body: JSON.stringify({
    query,
    variables: { dice, sides },
  })
})
  .then(r => r.json())

*/
