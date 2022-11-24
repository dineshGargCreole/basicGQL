import { qutoes, users } from "./fakedb.js";
import { randomBytes } from "crypto";

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

  Mutation: {
    signupUserDummy: (_, { firstName, lastName, email, password }) => {
      const id = randomBytes(5).toString("hex");
      users.push({
        id,
        firstName,
        lastName,
        email,
        password
      })
    },
  },
};

export default resolvers;
