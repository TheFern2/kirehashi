import React from "react";
import ReactMarkdown from "react-markdown";
import SyntaxHighlighter from "react-syntax-highlighter";
import { docco } from "react-syntax-highlighter/dist/esm/styles/hljs";
import { DetailedGist } from "../interfaces/DetailedGist";
import { RouteComponentProps } from "react-router-dom";
import "../App.css";

// https://www.pluralsight.com/guides/react-router-typescript
type TParams = { gistDescription: string };

const fullGist = ({ match, history }: RouteComponentProps<TParams>) => {
  console.log(match.params.gistDescription);
  return <div>Hello FAB {match.params.gistDescription}</div>;
};

export default fullGist;
