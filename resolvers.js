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
    signupUserDummy: (_, { userNew }) => {
      const id = randomBytes(5).toString("hex");
      users.push({
        id,
        ...userNew,
      });
      return users.find((user) => user.id === id);
    },
  },
};

export default resolvers;
