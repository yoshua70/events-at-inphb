import { ApolloServer } from "apollo-server-micro";
import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import "reflect-metadata";
import { buildSchema } from "type-graphql";
import { resolvers } from "graphql/resolvers/generated/type-graphql";
import prisma from "lib/prisma-client";
import { __prod__ } from "helpers/constants";
import initMiddleware from "lib/init-middleware";
import Cors from "cors";

export const config = {
  api: {
    bodyParser: false,
  },
};

const cors = initMiddleware(
  Cors({
    methods: ["GET", "POST", "OPTIONS"],
  })
);

const apiHandler: NextApiHandler = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  await cors(req, res);

  const schema = await buildSchema({
    resolvers,
    validate: false,
  });

  const apolloServer = new ApolloServer({
    schema,
    csrfPrevention: true,
    context: () => ({ prisma }),
  });

  await apolloServer.start();

  await apolloServer.createHandler({
    path: "/api/graphql",
  })(req, res);
};

export default apiHandler;
