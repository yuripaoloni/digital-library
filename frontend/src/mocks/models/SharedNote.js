import { getMockGroup } from "./Group";
import { getMockNotes } from "./Note";
import { getMockUser } from "./User";

export const getMockSharedNotes = (notes, user) => {
  return notes.map((note, index) => {
    return {
      ...getMockNotes([note], index)[0],
      user: { ...getMockUser("MockUser", true) },
      group: { ...getMockGroup(["MockGroup"])[0] },
    };
  });
};
