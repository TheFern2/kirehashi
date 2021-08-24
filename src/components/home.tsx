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
import { usePrevious } from "../utils/customHooks";

const Home = () => {
  // let mylist: any[] = detailedGistsJson;
  // let mylist: DetailedGist[] = detailedGistsJson;
  // console.log(mylist);
  const [selectedLanguage, setSelectedLanguage] = useState("All");
  const prevSelectedLanguage = usePrevious(selectedLanguage);
  const [pageSize, setPageSize] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
  const gistDataContext = useContext(DetailedGistContext);
  let languagesFound: any[] = ["All"];
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
  };

  gistDataContext.forEach((gist, index) => {
    const keys = Object.keys(gist.files);
    keys.forEach((key) => {
      if (gist.files[key]?.language) {
        languagesFound.push(gist.files[key]?.language);
      }
    });
  });

  languagesFound = Array.from(new Set(languagesFound));

  // filter gists from filter sidebar & pagination
  useEffect(() => {
    console.log("useEffect render filter sidebar");
    // if selectedLanguage has changed then place current page at 1
    if (selectedLanguage !== prevSelectedLanguage) {
      setCurrentPage(1);
    }

    if (selectedLanguage === "All") {
      setFilteredGists(gistDataContext);
      setGistData(paginate(gistDataContext, currentPage, pageSize));
    } else {
      setFilteredGists(filterGists(gistDataContext, selectedLanguage));
      setGistData(
        paginate(
          filterGists(gistDataContext, selectedLanguage),
          currentPage,
          pageSize
        )
      );
    }
  }, [selectedLanguage, gistDataContext, currentPage, pageSize]);

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
