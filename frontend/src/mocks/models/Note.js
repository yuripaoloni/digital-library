import { getMockUser } from "./User";

export const getMockNotes = (notes, manualIndex) => {
  return notes.map((note, index) => {
    return {
      id: manualIndex ? manualIndex : index,
      book: {
        id: 11,
        title:
          "Annuario della libera Università degli studi di Camerino - Anno scolastico 1881-82",
        author: "Università di Camerino",
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
      user: getMockUser(),
      page: index,
      title: `${note}-${index}`,
      description: `{"blocks":[{"key":"brhle","text":"test note ${
        manualIndex ? manualIndex : index
      }","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}`,
    };
  });
};
