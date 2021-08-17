import React from "react";
import ReactMarkdown from "react-markdown";
import SyntaxHighlighter from "react-syntax-highlighter";
import { docco } from "react-syntax-highlighter/dist/esm/styles/hljs";
import { DetailedGist } from "../interfaces/DetailedGist";
import fullGist from "./fullGist";
import { Switch, Route, Link } from "react-router-dom";
import "../App.css";

const Gist = (props: { gistData: DetailedGist }) => {
  // console.log(Object.keys(props.gistData.files)[0]);
  const firstFile = Object.keys(props.gistData.files)[0];
  const firstFileLanguage = props.gistData.files[firstFile]?.language;
  const gistDescription =
    props.gistData.description !== "" ? props.gistData.description : "Untitled";
  const firstFileContent = props.gistData.files[firstFile]?.content;
  const contentSplitInLines = firstFileContent!.split(/\r?\n/); // split by: \r\n  or  \n
  const truncatedContent = contentSplitInLines.slice(0, 25);

  return (
    <div className="gist-container">
      <div className="gist-top">
        <div className="gist-top-left">
          <h4 className="gist-description">{gistDescription}</h4>
          <h6>{firstFileLanguage}</h6>
          {props.gistData.public && <i className="fa fa-user-secret"></i>}
        </div>
        <div className="gist-top-right">
          <i className="fa fa-github"></i>
          <i className="fa fa-pencil"></i>
          <i className="fa fa-trash-o"></i>
        </div>
      </div>
      <div className="gist-bottom">
        {firstFileLanguage === "Markdown" ? (
          <ReactMarkdown className="markdown">
            {truncatedContent.join("\n")}
          </ReactMarkdown>
        ) : (
          <SyntaxHighlighter
            className="language"
            language={firstFileLanguage!}
            style={docco}
          >
            {truncatedContent.join("\n")}
          </SyntaxHighlighter>
        )}
        <Link
          to={{
            pathname: `/fullGist/${gistDescription}`,
            state: { gistDescription: gistDescription },
          }}
        >
          Gist Detail Test
        </Link>
      </div>
    </div>
  );
};

export default Gist;
