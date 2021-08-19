import GistList from "./gistList";
import React, { useContext } from "react";
import { DetailedGistContext } from "../App";
import { DetailedGist } from "../interfaces/DetailedGist";
import detailedGistsJson from "./detailedGists.json";

const Home = () => {
  // let mylist: any[] = detailedGistsJson;
  // let mylist: DetailedGist[] = detailedGistsJson;
  // console.log(mylist);

  const gistDataContext = useContext(DetailedGistContext);
  // console.log(gistDataContext);

  return (
    <div className="row">
      <div style={{ backgroundColor: "brown" }} className="col-3">
        <ul>
          <li>Coffee</li>
          <li>Tea</li>
          <li>Milk</li>
          <li>Coffee</li>
          <li>Tea</li>
          <li>Milk</li>
          <li>Coffee</li>
          <li>Tea</li>
          <li>Milk</li>
        </ul>
      </div>
      <div className="col">
        <GistList detailedGists={gistDataContext!} />
      </div>
    </div>
  );
};

export default Home;
