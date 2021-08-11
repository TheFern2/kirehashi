import React from "react";
import { DetailedGist } from "../interfaces/DetailedGist";

const Gist = (props: { gistData: DetailedGist }) => {
  console.log(Object.keys(props.gistData.files)[0]);
  const firstFile = Object.keys(props.gistData.files)[0];
  const gistDescription =
    props.gistData.description !== "" ? props.gistData.description : "Untitled";

  return (
    <React.Fragment>
      <h4>
        {gistDescription} {String(props.gistData.public)}
      </h4>
      <p>{props.gistData.files[firstFile]?.content}</p>
    </React.Fragment>
  );
};

export default Gist;
