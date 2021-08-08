import Gist from "./gist";

const GistList = (props: { gistNames: string[] }) => {
  console.log(props.gistNames);
  const gistList = props.gistNames.map((gist) => {
    return <Gist gistName={gist} />;
  });
  return <div>{gistList}</div>;
};

export default GistList;
