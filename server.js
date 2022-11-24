import { ApolloServer, gql } from "apollo-server";
import { ApolloServerPluginLandingPageGraphQLPlayground } from "apollo-server-core";
import { qutoes, users } from "./fakedb.js";

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
`;

const resolvers = {
  Query: {
    users: () => users,
    user: (_, args) => users.find((ur) => ur.id == args.id),
    qutoes: () => qutoes,
    qutoesByUser: (_, { by }) => qutoes.filter((qt) => qt.by == by),
  },

  User: {
    qutoes: (ur) => qutoes.filter((qutoe) => qutoe.by == ur.id),
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  plugins: [ApolloServerPluginLandingPageGraphQLPlayground()],
});

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`);
});
