import React, { useState } from "react";
import { GithubGist } from "../utils/githubApi";

// https://dev.to/alexander7161/react-context-api-with-typescript-example-j7a
type GistsContextState = {
  gists: GithubGist[];
  updateGists: (gists: GithubGist[]) => void;
};

type GistsProviderProps = { children: React.ReactNode };

const contextDefaultValues: GistsContextState = {
  gists: [],
  updateGists: () => {},
};

export const GistsStateContext = React.createContext<GistsContextState>(
  contextDefaultValues
);

const GistsProvider = ({ children }: GistsProviderProps) => {
  // Note that the following could be, and we wouldn't need to destructure value in return:
  // detailedGists => gists
  // and updateState => updateGists
  const [detailedGists, setDetailedGists] = useState<GithubGist[]>(
    contextDefaultValues.gists
  );

  const updateState = (updatedArray: GithubGist[]) => {
    setDetailedGists(updatedArray);
  };

  return (
    <GistsStateContext.Provider
      value={{ gists: detailedGists, updateGists: updateState }}
    >
      {children}
    </GistsStateContext.Provider>
  );
};

export default GistsProvider;
