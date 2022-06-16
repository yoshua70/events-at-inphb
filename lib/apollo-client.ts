import { ApolloClient, InMemoryCache } from "@apollo/client";

const apollo = new ApolloClient({
  uri: "/api/graphql",
  cache: new InMemoryCache(),
  credentials: "include",
});

export default apollo;
