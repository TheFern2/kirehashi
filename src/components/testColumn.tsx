import GistList from "./gistList";
import { DetailedGist } from "../interfaces/DetailedGist";
import detailedGistsJson from "./detailedGists.json";

const TestColumn = () => {
  let mylist: any[] = detailedGistsJson;
  console.log(mylist);

  mylist.forEach((item) => {
    console.log(item.url);
  });

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
        <GistList />
      </div>
    </div>
  );
};

export default TestColumn;
