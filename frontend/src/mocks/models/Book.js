import { getMockLibraries } from "mocks/models/Library";

export const getMockBooks = (titles) => {
  return titles.map((title, index) => {
    return {
      id: index,
      author: `author-${index}`,
      genre: `genre-${index}`,
      language: `language-${index}`,
      library: getMockLibraries(["MockLibrary"]).reduce((a, v) => ({
        ...a,
        [v]: v,
      })),
      pages: index + 10,
      plot: `plot-${index}`,
      remoteId: index,
      title: title,
      year: 1720 + index,
    };
  });
};
