import { GistFile } from "../interfaces/DetailedGist";
import React from "react";
import ReactMarkdown from "react-markdown";
import SyntaxHighlighter from "react-syntax-highlighter";
import { docco } from "react-syntax-highlighter/dist/esm/styles/hljs";
import { DetailedGist } from "../interfaces/DetailedGist";
import FullGist from "./fullGist";
import { Switch, Route, Link } from "react-router-dom";
import "../App.css";

const GistFull = (props: {
  isPublic: boolean;
  gistDescription: string;
  data: GistFile | undefined;
}) => {
  const fileContent = props.data?.content;
  const contentSplitInLines = fileContent!.split(/\r?\n/); // split by: \r\n  or  \n
  const truncatedContent = contentSplitInLines.slice(
    0,
    contentSplitInLines.length
  );

  return (
    <div className="gist-container">
      <div className="gist-top">
        <div className="gist-top-left">
          <h4 className="gist-description">{props.data?.filename}</h4>
          <h6>{props.data?.language}</h6>
          {props.isPublic && <i className="fa fa-user-secret"></i>}
        </div>
        <div className="gist-top-right">
          <i className="fa fa-github"></i>
          <i className="fa fa-pencil"></i>
          <i className="fa fa-trash-o"></i>
        </div>
      </div>
      <div className="gist-bottom">
        {props.data?.language === "Markdown" ? (
          <ReactMarkdown className="markdown">
            {truncatedContent.join("\n")}
          </ReactMarkdown>
        ) : (
          <SyntaxHighlighter
            className="language"
            language={props.data?.language!}
            style={docco}
          >
            {truncatedContent.join("\n")}
          </SyntaxHighlighter>
        )}
      </div>
    </div>
  );
};

export default GistFull;
