import GistList from "./gistList";
import React, { useContext } from "react";
import { DetailedGistContext } from "../App";
import { DetailedGist } from "../interfaces/DetailedGist";
import detailedGistsJson from "./detailedGists.json";
import Filtering from "./filtering";
import { useState } from "react";

const Home = () => {
  // let mylist: any[] = detailedGistsJson;
  // let mylist: DetailedGist[] = detailedGistsJson;
  // console.log(mylist);
  const [selectedLanguage, setSelectedLanguage] = useState("");
  const someLangs = ["javascript", "markdown", "text"];

  const gistDataContext = useContext(DetailedGistContext);
  // console.log(gistDataContext);
  const handleLanguageSelect = (language: string) => {
    console.log(selectedLanguage);
    setSelectedLanguage(language);
  };

  let languagesFound: any[] = [];

  gistDataContext.forEach((gist, index) => {
    const keys = Object.keys(gist.files);
    keys.forEach((key) => {
      if (gist.files[key]?.language) {
        languagesFound.push(gist.files[key]?.language);
      }
    });
  });

  // console.log(new Set(languagesFound));
  languagesFound = Array.from(new Set(languagesFound));

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
        <GistList detailedGists={gistDataContext!} />
      </div>
    </div>
  );
};

export default Home;
