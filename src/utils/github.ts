import { graphql } from "../gql";

import { ApolloClient, InMemoryCache } from "@apollo/client";

const token = "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";
export const client = new ApolloClient({
  uri: "https://api.github.com/graphql",
  headers: { authorization: `Bearer ${token}` },
  cache: new InMemoryCache(),
});

export const myRepositories = graphql(`
  query MyRepositories {
    viewer {
      repositories(first: 30, orderBy: { field: CREATED_AT, direction: ASC }) {
        nodes {
          name
          url
        }
      }
    }
  }
`);
