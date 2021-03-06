import ReactMarkdown from "react-markdown";
import SyntaxHighlighter from "react-syntax-highlighter";
import { docco } from "react-syntax-highlighter/dist/esm/styles/hljs";
import { GistFile } from "../interfaces/DetailedGist";
import "../App.css";
import { useHistory } from "react-router-dom";
import React from "react";

const Gist = (props: {
  gistUrl: string | undefined;
  gistId: string | undefined;
  gistData: GistFile | null | undefined;
  isPublic: boolean | undefined;
  isEditable: boolean;
  fullView: boolean;
  maxLines?: number;
  gistDescription?: string | null | undefined;
  isClickable: boolean;
}) => {
  const history = useHistory();
  const maxLines = props.maxLines ? props.maxLines : 25;
  const fileContent = props.gistData!.content;
  const contentSplitInLines = fileContent!.split(/\r?\n/); // split by: \r\n  or  \n
  const truncatedContent = props.fullView
    ? contentSplitInLines.slice(0, contentSplitInLines.length)
    : contentSplitInLines.slice(0, maxLines);

  const handleDetailedGist = () => {
    // console.log("test function");
    if (props.isClickable) {
      history.push(`/fullGist/${props.gistId}`);
    }
  };

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
          <a href={props.gistUrl} target="_blank" rel="noreferrer">
            <i className="fa fa-github"></i>
          </a>
          {props.isEditable && <i className="fa fa-pencil"></i>}
          <i className="fa fa-trash-o"></i>
        </div>
      </div>{" "}
      <div
        className={
          props.isClickable ? "gist-bottom highlighted" : "gist-bottom"
        }
        onClick={handleDetailedGist}
      >
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

export default React.memo(Gist);
