import GistList from "./gistList";
import { DetailedGist } from "../interfaces/DetailedGist";
import detailedGistsJson from "./detailedGists.json";

const TestColumn = () => {
  // let mylist: any[] = detailedGistsJson;
  let mylist: DetailedGist[] = detailedGistsJson;
  // console.log(mylist);

  // For now we're storing fake api data into localStorage
  // This will be replaced with real api data
  localStorage.setItem("DETAILED_DATA", JSON.stringify(mylist));

  // Then make this data available through context
  // TODO Json mockup data and mylist and localStorage move to App

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
        <GistList detailedGists={mylist} />
      </div>
    </div>
  );
};

export default TestColumn;
