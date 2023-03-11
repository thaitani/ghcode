import fetch from "node-fetch";
import { getPreferenceValues } from "@raycast/api";
import { graphql } from "../gql";

import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client";

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: new HttpLink({
    uri: "https://api.github.com/graphql",
    fetch,
    headers: { authorization: `Bearer ${getPreferenceValues().githubToken}` },
  }),
});

const myRepositories = graphql(`
  query MyRepositories($after: String) {
    viewer {
      login
      repositories(first: 100, after: $after) {
        nodes {
          name
          description
          url
          sshUrl
          visibility
        }
        pageInfo {
          hasNextPage
          endCursor
        }
      }
    }
  }
`);

export type MyRepo = {
  sshUrl: string | undefined;
  name: string;
};

export const fetchMyRepositories = async (after?: string): Promise<MyRepo[]> => {
  const { data } = await client.query({ query: myRepositories, variables: { after } });
  const nodes = data.viewer.repositories.nodes;
  if (!nodes) {
    return [];
  }
  return nodes
    .filter((e) => e?.sshUrl !== null)
    .map((e) => {
      return {
        sshUrl: e?.sshUrl,
        name: `${data.viewer.login}/${e?.name}`,
      } as MyRepo;
    });
};
