import React, { useState, FC } from "react";
import { GithubGist } from "../utils/githubApi";

// https://dev.to/alexander7161/react-context-api-with-typescript-example-j7a
type GistsContextState = {
  gists: GithubGist[];
  updateGists: (gists: GithubGist[]) => void;
  updateGist: (gist: GithubGist) => void;
  addGist: (gist: GithubGist) => void;
};

type GistsProviderProps = { children: React.ReactNode };

const someGist: GithubGist = {
  url: "https://api.github.com/gists/234d84820a3dd1598acdf5604c186a01",
  forks_url:
    "https://api.github.com/gists/234d84820a3dd1598acdf5604c186a01/forks",
  commits_url:
    "https://api.github.com/gists/234d84820a3dd1598acdf5604c186a01/commits",
  id: "244d84820a3dd1598acdf5604c186a01",
  node_id: "MDQ6R2lzdDIzNGQ4NDgyMGEzZGQxNTk4YWNkZjU2MDRjMTg2YTAx",
  git_pull_url: "https://gist.github.com/234d84820a3dd1598acdf5604c186a01.git",
  git_push_url: "https://gist.github.com/234d84820a3dd1598acdf5604c186a01.git",
  html_url: "https://gist.github.com/234d84820a3dd1598acdf5604c186a01",
  files: {
    "test2.md": {
      filename: "test2.md",
      type: "text/markdown",
      language: "Markdown",
      raw_url:
        "https://gist.githubusercontent.com/TheFern2/234d84820a3dd1598acdf5604c186a01/raw/9e06fe37e5f9221cea35c1898801e532221aefe2/test.md",
      size: 11,
      truncated: false,
      content: "test sdfsdf",
    },
  },
  public: false,
  created_at: "2021-08-26T15:40:05Z",
  updated_at: "2021-08-26T15:41:03Z",
  description: "test2",
  comments: 0,
  user: null,
  comments_url:
    "https://api.github.com/gists/234d84820a3dd1598acdf5604c186a01/comments",
  owner: {
    login: "TheFern2",
    id: 10265682,
    node_id: "MDQ6VXNlcjEwMjY1Njgy",
    avatar_url: "https://avatars.githubusercontent.com/u/10265682?v=4",
    gravatar_id: "",
    url: "https://api.github.com/users/TheFern2",
    html_url: "https://github.com/TheFern2",
    followers_url: "https://api.github.com/users/TheFern2/followers",
    following_url:
      "https://api.github.com/users/TheFern2/following{/other_user}",
    gists_url: "https://api.github.com/users/TheFern2/gists{/gist_id}",
    starred_url: "https://api.github.com/users/TheFern2/starred{/owner}{/repo}",
    subscriptions_url: "https://api.github.com/users/TheFern2/subscriptions",
    organizations_url: "https://api.github.com/users/TheFern2/orgs",
    repos_url: "https://api.github.com/users/TheFern2/repos",
    events_url: "https://api.github.com/users/TheFern2/events{/privacy}",
    received_events_url:
      "https://api.github.com/users/TheFern2/received_events",
    type: "User",
    site_admin: false,
  },
  forks: [],
  history: [
    {
      user: {
        login: "TheFern2",
        id: 10265682,
        node_id: "MDQ6VXNlcjEwMjY1Njgy",
        avatar_url: "https://avatars.githubusercontent.com/u/10265682?v=4",
        gravatar_id: "",
        url: "https://api.github.com/users/TheFern2",
        html_url: "https://github.com/TheFern2",
        followers_url: "https://api.github.com/users/TheFern2/followers",
        following_url:
          "https://api.github.com/users/TheFern2/following{/other_user}",
        gists_url: "https://api.github.com/users/TheFern2/gists{/gist_id}",
        starred_url:
          "https://api.github.com/users/TheFern2/starred{/owner}{/repo}",
        subscriptions_url:
          "https://api.github.com/users/TheFern2/subscriptions",
        organizations_url: "https://api.github.com/users/TheFern2/orgs",
        repos_url: "https://api.github.com/users/TheFern2/repos",
        events_url: "https://api.github.com/users/TheFern2/events{/privacy}",
        received_events_url:
          "https://api.github.com/users/TheFern2/received_events",
        type: "User",
        site_admin: false,
      },
      version: "55909c6ffde10ed5bbc01fff264bb93462c2db22",
      committed_at: "2021-08-26T15:41:03Z",
      change_status: {
        total: 2,
        additions: 1,
        deletions: 1,
      },
      url:
        "https://api.github.com/gists/234d84820a3dd1598acdf5604c186a01/55909c6ffde10ed5bbc01fff264bb93462c2db22",
    },
    {
      user: {
        login: "TheFern2",
        id: 10265682,
        node_id: "MDQ6VXNlcjEwMjY1Njgy",
        avatar_url: "https://avatars.githubusercontent.com/u/10265682?v=4",
        gravatar_id: "",
        url: "https://api.github.com/users/TheFern2",
        html_url: "https://github.com/TheFern2",
        followers_url: "https://api.github.com/users/TheFern2/followers",
        following_url:
          "https://api.github.com/users/TheFern2/following{/other_user}",
        gists_url: "https://api.github.com/users/TheFern2/gists{/gist_id}",
        starred_url:
          "https://api.github.com/users/TheFern2/starred{/owner}{/repo}",
        subscriptions_url:
          "https://api.github.com/users/TheFern2/subscriptions",
        organizations_url: "https://api.github.com/users/TheFern2/orgs",
        repos_url: "https://api.github.com/users/TheFern2/repos",
        events_url: "https://api.github.com/users/TheFern2/events{/privacy}",
        received_events_url:
          "https://api.github.com/users/TheFern2/received_events",
        type: "User",
        site_admin: false,
      },
      version: "cf2b959afd361ceaf9762ddf5e84384be9209cc0",
      committed_at: "2021-08-26T15:40:05Z",
      change_status: {
        total: 1,
        additions: 1,
        deletions: 0,
      },
      url:
        "https://api.github.com/gists/234d84820a3dd1598acdf5604c186a01/cf2b959afd361ceaf9762ddf5e84384be9209cc0",
    },
  ],
  truncated: false,
};

const contextDefaultValues: GistsContextState = {
  gists: [],
  updateGists: () => {},
  updateGist: () => {},
  addGist: () => {},
};

export const GistsStateContext = React.createContext<GistsContextState>(
  contextDefaultValues
);

const GistsProvider: FC = ({ children }) => {
  // Note that the following could be, and we wouldn't need to destructure value in return:
  // detailedGists => gists
  // and updateState => updateGists
  const [gists, setGists] = useState<GithubGist[]>(contextDefaultValues.gists);

  const updateGists = (updatedArray: GithubGist[]) => {
    console.log("updateState has been called");
    // setGists((gists) => [...gists].concat(updatedArray));
    setGists(updatedArray);
  };

  const updateGist = (gist: GithubGist) => {
    const newGists = gists.map((item) => {
      if (item.id === gist.id) {
        return gist;
      }
      return item;
    });
    setGists(newGists);
  };

  const addGist = (gist: GithubGist) => {
    setGists((gists) => [gist, ...gists]);
  };

  return (
    <GistsStateContext.Provider
      value={{ gists, updateGists, updateGist, addGist }}
    >
      {children}
    </GistsStateContext.Provider>
  );
};

export default GistsProvider;
