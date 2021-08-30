import React, { useContext, useEffect } from "react";
import logo from "./logo.svg";
import "./App.css";
import NavBar from "./components/navBar";
import Home from "./components/home";
import { Switch, Route } from "react-router-dom";
import FullGist from "./components/fullGist";
import TestComponent from "./components/test";
import { DetailedGist } from "./interfaces/DetailedGist";
import detailedGistsJson from "./components/detailedGists.json";
import { GithubApi, GithubGist } from "./utils/githubApi";
import GistsProvider, { GistsStateContext } from "./components/gistContext";
import { TOKEN_SECRET } from "./secret";
import TodosProvider, { TodosContext } from "./components/TodosContext";

// let mylist: GithubGist[] = detailedGistsJson;
// Then make this data available through context
// export const DetailedGistContext = React.createContext<GithubGist[]>(mylist);

function App() {
  const { gists, updateGists } = useContext(GistsStateContext);
  const githubApi = new GithubApi(TOKEN_SECRET);

  // octokit test

  // useEffect(() => {
  //   const getMyGists = async () => {
  //     // const briefGists = await githubApi.getBriefGists();
  //     const detailedGists = await githubApi.getDetailedGists();
  //     updateGists(detailedGists);
  //   };
  //   getMyGists();
  // }, []);

  // octokit test

  const someGist: GithubGist = {
    url: "https://api.github.com/gists/234d84820a3dd1598acdf5604c186a01",
    forks_url:
      "https://api.github.com/gists/234d84820a3dd1598acdf5604c186a01/forks",
    commits_url:
      "https://api.github.com/gists/234d84820a3dd1598acdf5604c186a01/commits",
    id: "234d84820a3dd1598acdf5604c186a01",
    node_id: "MDQ6R2lzdDIzNGQ4NDgyMGEzZGQxNTk4YWNkZjU2MDRjMTg2YTAx",
    git_pull_url:
      "https://gist.github.com/234d84820a3dd1598acdf5604c186a01.git",
    git_push_url:
      "https://gist.github.com/234d84820a3dd1598acdf5604c186a01.git",
    html_url: "https://gist.github.com/234d84820a3dd1598acdf5604c186a01",
    files: {
      "test.md": {
        filename: "test.md",
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
    description: "test",
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
      starred_url:
        "https://api.github.com/users/TheFern2/starred{/owner}{/repo}",
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

  // updateGists([someGist]);

  // console.log(`Data from app gistContext: ${gists}`);
  //         <button onClick={() => updateGists(someGist as any)}>Print</button>

  // For now we're storing fake api data into localStorage
  // This will be replaced with real api data
  localStorage.setItem("GISTS_DETAILED_DATA", JSON.stringify(gists));

  return (
    <React.Fragment>
      <NavBar />
      <GistsProvider>
        <Switch>
          <Route exact path="/" component={Home}></Route>
          <Route path="/test" component={TestComponent}></Route>
          <Route path="/fullGist/:id" component={FullGist}></Route>
        </Switch>
      </GistsProvider>
    </React.Fragment>
  );
}

export default App;
