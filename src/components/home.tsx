import GistList from "./gistList";
import React, { useContext } from "react";
import { DetailedGist } from "../interfaces/DetailedGist";
import Filtering from "./filtering";
import { useState } from "react";
import { useEffect } from "react";
import { filterGists } from "../utils/filter";
import Pagination from "../components/pagination";
import { paginate } from "../utils/paginate";
import { usePrevious } from "../utils/customHooks";
import { GithubGist, GithubApi } from "../utils/githubApi";
import { TOKEN_SECRET } from "../secret";
import { GistsStateContext } from "./gistContext";
import TodosProvider, { TodosContext } from "./TodosContext";

const Home = () => {
  // octokit test
  const githubApi = new GithubApi(TOKEN_SECRET);
  const { gists, updateGists } = useContext(GistsStateContext);
  const { todos, addTodo } = useContext(TodosContext);
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

  // useEffect(() => {
  //   const getMyGists = async () => {
  //     let briefGists = await githubApi.getBriefGists();
  //     // console.log(testGist);
  //     githubApi.compareDetailedGistArray(briefGists, gistDataContext);
  //   };
  //   getMyGists();
  // }, []);

  // let mylist: any[] = detailedGistsJson;
  // let mylist: DetailedGist[] = detailedGistsJson;
  // console.log(mylist);
  const [selectedLanguage, setSelectedLanguage] = useState("All");
  const prevSelectedLanguage = usePrevious(selectedLanguage);
  const [pageSize, setPageSize] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
  let languagesFound: any[] = ["All"];
  const [filteredGists, setFilteredGists] = useState<GithubGist[]>(gists);
  const [gistData, setGistData] = useState<GithubGist[]>(gists);
  // console.log(gistDataContext);
  const handleLanguageSelect = (language: string) => {
    // console.log(language);
    setSelectedLanguage(language);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  gists.forEach((gist, index) => {
    const keys = Object.keys(gist.files!);
    keys.forEach((key) => {
      if (gist.files) {
        languagesFound.push(gist.files[key]?.language);
      }
    });
  });

  languagesFound = Array.from(new Set(languagesFound));

  useEffect(() => {
    const getMyGists = async () => {
      const gistData = localStorage.getItem("GISTS_DETAILED_DATA");
      console.log(gistData);

      // if localStorage has data
      if (gistData) {
        let briefGists = await githubApi.getBriefGists();
        const newGists = await githubApi.compareDetailedGistArray(
          briefGists,
          JSON.parse(gistData)
        );
        updateGists(newGists);
        localStorage.setItem("GISTS_DETAILED_DATA", JSON.stringify(newGists));
      } else {
        console.log("call all detailedGists");
        // const detailedGists = await githubApi.getDetailedGists();
        // updateGists(detailedGists);
        // localStorage.setItem(
        //   "GISTS_DETAILED_DATA",
        //   JSON.stringify(detailedGists)
        // );
      }
      // const briefGists = await githubApi.getBriefGists();
    };
    getMyGists();
  }, []);

  // filter gists from filter sidebar & pagination
  useEffect(() => {
    // console.log("useEffect render filter sidebar");
    // if selectedLanguage has changed then place current page at 1
    if (selectedLanguage !== prevSelectedLanguage) {
      setCurrentPage(1);
    }

    if (selectedLanguage === "All") {
      setFilteredGists(gists);
      setGistData(paginate(gists, currentPage, pageSize));
    } else {
      setFilteredGists(filterGists(gists, selectedLanguage));
      setGistData(
        paginate(filterGists(gists, selectedLanguage), currentPage, pageSize)
      );
    }
  }, [selectedLanguage, gists, currentPage, pageSize]);

  return (
    <div className="row">
      <div className="col-3" id="filtering">
        <Filtering
          items={languagesFound}
          onItemSelect={handleLanguageSelect}
          selectedItem={selectedLanguage}
        />
      </div>
      <div className="col">
        <GistList detailedGists={gistData} />
        <Pagination
          itemsCount={filteredGists.length}
          pageSize={pageSize}
          currentPage={currentPage}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
};

export default Home;
