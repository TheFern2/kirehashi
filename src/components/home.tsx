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

const Home = () => {
  // octokit test
  // const githubApi = new GithubApi(TOKEN_SECRET);
  // const gistDataContext = useContext(DetailedGistContext);
  const { gists, updateGists } = useContext(GistsStateContext);

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
