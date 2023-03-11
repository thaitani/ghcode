import { getPreferenceValues } from "@raycast/api";
import { graphql } from "../gql";

import { ApolloClient, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
  uri: "https://api.github.com/graphql",
  headers: { authorization: `Bearer ${getPreferenceValues().githubToken}` },
  cache: new InMemoryCache(),
});

const myRepositories = graphql(`
  query MyRepositories {
    viewer {
      login
      repositories(first: 100, orderBy: { field: UPDATED_AT, direction: DESC }) {
        nodes {
          name
          description
          url
          sshUrl
          visibility
        }
      }
    }
  }
`);

export type MyRepo = {
  sshUrl: string | undefined;
  name: string;
};

export const fetchMyRepositories = async (): Promise<MyRepo[]> => {
  const { data } = await client.query({ query: myRepositories });
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
