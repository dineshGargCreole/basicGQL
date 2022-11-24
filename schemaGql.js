import { gql } from "apollo-server";

const typeDefs = gql`
  type Query {
    users: [User]
    user(id: ID!): User
    qutoes: [Qutoe]
    qutoesByUser(by: ID!): [Qutoe]
  }

  type User {
    id: ID!
    firstName: String
    lastName: String
    email: String
    password: String
    qutoes: [Qutoe]
  }

  type Qutoe {
    name: String
    by: ID
  }

  type Mutation {
    signupUserDummy(
      firstName: String
      lastName: String
      email: String
      password: String
    ): User
  }
`;

export default typeDefs;
