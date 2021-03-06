export const getMockBookmark = (bookmarks) => {
  return bookmarks.map((bookmark, index) => {
    return {
      id: index,
      book: {
        id: 11,
        title:
          "Annuario della libera Universit√† degli studi di Camerino - Anno scolastico 1881-82",
        author: "Universit√† di Camerino",
        pages: 130,
        library: {
          id: 0,
          name: "Biblioteca digitale unicam",
          url: "https://bibliotecadigitale.unicam.it",
          icon: "https://bibliotecadigitale.unicam.it/Images/Logo.ico",
        },
        remoteId: 1222,
        language: "italiano",
        year: 1882,
        genre: "B.G.1-6",
        plot: null,
      },
      page: index,
      description: bookmark,
    };
  });
};
