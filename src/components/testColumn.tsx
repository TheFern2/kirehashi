import GistList from "./gistList";
import { DetailedGist } from "../interfaces/DetailedGist";
import detailedGistsJson from "./detailedGists.json";
import { useState } from "react";

const TestColumn = () => {
  // let mylist: any[] = detailedGistsJson;
  let mylist: DetailedGist[] = detailedGistsJson;
  // console.log(mylist);

  let gistNames: string[] = [];
  mylist.forEach((item) => {
    // console.log(item.description);
    gistNames.push(item.description);
  });

  // const [names, setNames] = useState(gistNames)

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
        <GistList gistNames={gistNames} />
      </div>
    </div>
  );
};

export default TestColumn;
