import React, { useContext, useEffect } from "react";
import { DetailedGistContext } from "../App";
import { RouteComponentProps } from "react-router-dom";
import Gist from "./gist";
import "../App.css";

// https://www.pluralsight.com/guides/react-router-typescript
// interface props extends RouteComponentProps {
//   id: string;
// }
type TParams = { id: string };

const FullGist = ({ match }: RouteComponentProps<TParams>) => {
  const gistDataContext = useContext(DetailedGistContext);
  // const { state } = useLocation<props>();
  // console.log(state.id);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // find correct gist based on id, this will be one array item, since is only one id
  // need to handle when id doesn't exist
  const gistData = gistDataContext.filter(
    (gist) => gist.id === match.params.id
  )[0];

  const keys = Object.keys(gistData.files!);
  // console.log(state.gistData.files[keys[0]]);

  return (
    <div className="gist-full">
      {keys.map((key, index) => {
        // Only send gist description for first/top gist
        const gistDescription = index === 0 ? gistData.description : undefined;
        return (
          <Gist
            key={index}
            gistUrl={gistData.html_url}
            gistId={gistData.id}
            gistData={gistData.files![key]}
            isPublic={gistData.public}
            isEditable={true}
            fullView={true}
            gistDescription={gistDescription}
            isClickable={false}
          />
        );
      })}
    </div>
  );
};

export default FullGist;
