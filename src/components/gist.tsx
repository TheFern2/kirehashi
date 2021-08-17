import React from "react";
import ReactMarkdown from "react-markdown";
import { DetailedGist } from "../interfaces/DetailedGist";
import "../App.css";

const Gist = (props: { gistData: DetailedGist }) => {
  console.log(Object.keys(props.gistData.files)[0]);
  const firstFile = Object.keys(props.gistData.files)[0];
  const firstFileLanguage = props.gistData.files[firstFile]?.language;
  const gistDescription =
    props.gistData.description !== "" ? props.gistData.description : "Untitled";
  const firstFileContent = props.gistData.files[firstFile]?.content
  const contentSplitInLines = firstFileContent!.split(/\r?\n/);  // split by: \r\n  or  \n
  const truncatedContent = contentSplitInLines.slice(0, 10)

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
        {firstFileLanguage === "Markdown" ? <ReactMarkdown>{truncatedContent.join("\n")}</ReactMarkdown> : <p>{truncatedContent.join("\n")}</p>}
      </div>
    </div>
  );
};

export default Gist;
