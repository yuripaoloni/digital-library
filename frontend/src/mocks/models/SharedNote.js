import { getMockNotes } from "./Note";
import { getMockUser } from "./User";

export const getMockSharedNotes = (notes, user) => {
  return notes.map((note, index) => {
    return {
      ...getMockNotes([note])[0],
      ...getMockUser([user])[0],
    };
  });
};
