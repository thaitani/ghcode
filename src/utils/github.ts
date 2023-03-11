import { getPreferenceValues } from "@raycast/api";
import { graphql } from "../gql";

import { ApolloClient, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
  uri: "https://api.github.com/graphql",
  headers: { authorization: `Bearer ${getPreferenceValues().githubToken}` },
  cache: new InMemoryCache(),
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
