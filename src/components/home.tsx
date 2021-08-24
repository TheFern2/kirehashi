import GistList from "./gistList";
import React, { useContext } from "react";
import { DetailedGistContext } from "../App";
import { DetailedGist } from "../interfaces/DetailedGist";
import Filtering from "./filtering";
import { useState } from "react";
import { useEffect } from "react";
import { filterGists } from "../utils/filter";
import Pagination from "../components/pagination";
import { paginate } from "../utils/paginate";

const Home = () => {
  // let mylist: any[] = detailedGistsJson;
  // let mylist: DetailedGist[] = detailedGistsJson;
  // console.log(mylist);
  const [selectedLanguage, setSelectedLanguage] = useState("All");
  const [pageSize, setPageSize] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
  const gistDataContext = useContext(DetailedGistContext);
  const [filteredGists, setFilteredGists] = useState<DetailedGist[]>(
    gistDataContext
  );
  const [gistData, setGistData] = useState<DetailedGist[]>(gistDataContext);
  // console.log(gistDataContext);
  const handleLanguageSelect = (language: string) => {
    // console.log(selectedLanguage);
    console.log(language);
    setSelectedLanguage(language);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    // setFilteredGists(paginate(filteredGists, currentPage, pageSize));
  };

  let languagesFound: any[] = ["All"];

  gistDataContext.forEach((gist, index) => {
    const keys = Object.keys(gist.files);
    keys.forEach((key) => {
      if (gist.files[key]?.language) {
        languagesFound.push(gist.files[key]?.language);
      }
    });
  });

  languagesFound = Array.from(new Set(languagesFound));

  // filter gists from filter sidebar
  useEffect(() => {
    console.log("useEffect render filter sidebar");
    //setCurrentPage(1);
    if (selectedLanguage === "All") {
      setFilteredGists(gistDataContext);
    } else {
      setFilteredGists(filterGists(gistDataContext, selectedLanguage));
    }
  }, [selectedLanguage, gistDataContext]);

  // filter gists for pagination
  // useEffect(() => {
  //   console.log("useEffect render pagination");
  //   setGistData(paginate(filteredGists, currentPage, pageSize));
  // }, [currentPage]);

  return (
    <div className="row">
      <div style={{ backgroundColor: "#72B8F0" }} className="col-3">
        <Filtering
          items={languagesFound}
          onItemSelect={handleLanguageSelect}
          selectedItem={selectedLanguage}
        />
      </div>
      <div className="col">
        <GistList detailedGists={filteredGists} />
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
