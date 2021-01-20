import {  gql } from 'apollo-server';

const typeDefs = gql`
            type Todo {
              id: ID!
              title: String!
              body: String!
              status: String!
              created_at: String!
            }

            input InputTodo {
              title: String!
              body: String!
              status: String!
            }

            type Query{
              getTodo(id: String): [Todo]!
            }

            type Mutation{
              deleteTodo(id: String!): Boolean!
              updateTodo(id: String!, input: InputTodo): Todo!
              addTodo(input: InputTodo): Todo!
            }
`;

export { typeDefs  };
