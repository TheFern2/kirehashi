import React, { useContext } from "react";
import ReactMarkdown from "react-markdown";
import SyntaxHighlighter from "react-syntax-highlighter";
import { docco } from "react-syntax-highlighter/dist/esm/styles/hljs";
import { DetailedGist, GistFile } from "../interfaces/DetailedGist";
import FullGist from "./fullGist";
import { Switch, Route, Link } from "react-router-dom";
import "../App.css";
import { DetailedGistContext } from "../App";

const Gist = (props: {
  gistData: GistFile | undefined;
  isPublic: boolean;
  isEditable: boolean;
  fullView: boolean;
  maxLines?: number;
  gistDescription?: string;
}) => {
  // console.log(Object.keys(props.gistData.files)[0]);
  // const firstFile = Object.keys(props.gistData.files)[0];
  // const firstFileLanguage = props.gistData.files[firstFile]?.language;
  // const gistDescription = props.gistData.description !== "" ? props.gistData.description : "Untitled";
  // const firstFileContent = props.gistData.files[firstFile]?.content;
  const fileContent = props.gistData!.content;
  const contentSplitInLines = fileContent!.split(/\r?\n/); // split by: \r\n  or  \n
  const truncatedContent = contentSplitInLines.slice(0, 25);

  return (
    <div className="gist-container">
      <div className="gist-title">
        {props.gistDescription && (
          <h4 className="gist-description">{props.gistDescription}</h4>
        )}
      </div>
      <div className="gist-top">
        <div className="gist-top-left">
          <h4 className="gist-filename">{props.gistData!.filename}</h4>
          <h6>{props.gistData!.language}</h6>
          {props.isPublic && <i className="fa fa-user-secret"></i>}
        </div>
        <div className="gist-top-right">
          <i className="fa fa-github"></i>
          <i className="fa fa-pencil"></i>
          <i className="fa fa-trash-o"></i>
        </div>
      </div>
      <div className="gist-bottom">
        {props.gistData!.language === "Markdown" ? (
          <ReactMarkdown className="markdown">
            {truncatedContent.join("\n")}
          </ReactMarkdown>
        ) : (
          <SyntaxHighlighter
            className="language"
            language={props.gistData!.language!}
            style={docco}
          >
            {truncatedContent.join("\n")}
          </SyntaxHighlighter>
        )}
      </div>
    </div>
  );
};

export default Gist;
