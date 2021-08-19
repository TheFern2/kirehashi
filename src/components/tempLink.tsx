import { Link } from "react-router-dom";
import { GistFile } from "../interfaces/DetailedGist";

const TempLink = (props: { id: string; gistData: GistFile }) => {
  return (
    <Link
      to={{
        pathname: `/fullGist/${props.id}`,
        state: {
          id: props.id,
          gistData: props.gistData,
        },
      }}
    >
      Gist Detail Test
    </Link>
  );
};

export default TempLink;
