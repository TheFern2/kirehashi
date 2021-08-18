import React from "react";
import ReactMarkdown from "react-markdown";
import SyntaxHighlighter from "react-syntax-highlighter";
import { docco } from "react-syntax-highlighter/dist/esm/styles/hljs";
import { DetailedGist } from "../interfaces/DetailedGist";
import { RouteComponentProps, useLocation } from "react-router-dom";
import GistFull from "./gistFile";
import "../App.css";

// https://www.pluralsight.com/guides/react-router-typescript
interface props extends RouteComponentProps {
  gistData: DetailedGist;
  id: string;
}

const FullGist = () => {
  // console.log(location.state);
  const { state } = useLocation<props>();
  // console.log(state.id);
  const keys = Object.keys(state.gistData.files);
  // console.log(state.gistData.files[keys[0]]);

  return (
    <div>
      <h4>{state.gistData.description}</h4>
      {keys.map((key, index) => {
        return (
          <GistFull
            key={index}
            isPublic={state.gistData.public}
            gistDescription={state.gistData.description}
            data={state.gistData.files[key]}
          />
        );
      })}
    </div>
  );
};

export default FullGist;
