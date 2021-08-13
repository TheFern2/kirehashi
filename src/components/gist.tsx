import React from "react";
import { DetailedGist } from "../interfaces/DetailedGist";
import "../App.css";

const Gist = (props: { gistData: DetailedGist }) => {
  console.log(Object.keys(props.gistData.files)[0]);
  const firstFile = Object.keys(props.gistData.files)[0];
  const gistDescription =
    props.gistData.description !== "" ? props.gistData.description : "Untitled";

  return (
    <div className="gist-container">
      <div className="gist-top">
        <div className="gist-top-left">
          <h4 className="gist-description">{gistDescription}</h4>
          {props.gistData.public && <i className="fa fa-user-secret"></i>}
        </div>
        <div className="gist-top-right">
          <i className="fa fa-github"></i>
          <i className="fa fa-pencil"></i>
          <i className="fa fa-trash-o"></i>
        </div>
      </div>
      <div className="gist-bottom">
        <p>{props.gistData.files[firstFile]?.content}</p>
      </div>
    </div>
  );
};

export default Gist;
