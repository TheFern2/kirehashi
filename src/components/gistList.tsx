import React from "react";
import Gist from "./gist";
import { GithubGist } from "../utils/githubApi";

const GistList = (props: { detailedGists: GithubGist[] }) => {
  // console.log(props.detailedGists.length);
  // const myContextStuff = useContext(DetailedGistContext);
  // console.log(myContextStuff);
  const gistList = props.detailedGists.map((gistData) => {
    const firstFile = Object.keys(gistData.files!)[0];
    // const firstFileLanguage = gistData.files[firstFile]?.language;
    return (
      <Gist
        key={gistData.id}
        gistUrl={gistData.html_url}
        gistId={gistData.id}
        gistData={gistData.files![firstFile]}
        isPublic={gistData.public}
        isEditable={false}
        fullView={false}
        gistDescription={gistData.description}
        isClickable={true}
        maxLines={10}
      />
    );
  });
  return <div className="gist-list">{gistList}</div>;
};

export default React.memo(GistList);
