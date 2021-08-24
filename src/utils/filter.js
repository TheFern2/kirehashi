// for now filtering based on first file
export const filterGists = (gists, filterLanguage) => {
  return gists.filter((gist) => {
    const firstFile = Object.keys(gist.files)[0];
    if (gist.files[firstFile]?.language === filterLanguage) {
      return true;
    }
    return false;
  });
};
