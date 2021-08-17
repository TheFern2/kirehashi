import { DetailedGist } from "../interfaces/DetailedGist";
import Gist from "./gist";

const GistList = (props: { detailedGists: DetailedGist[] }) => {
  // console.log(props.detailedGists.length);
  const gistList = props.detailedGists.map((gistData) => {
    return <Gist key={gistData.id} gistData={gistData} />;
  });
  return <div className="gist-list">{gistList}</div>;
};

export default GistList;
