import { getMockUser } from "./User";

export const getMockGroup = (groups, remove, isAdmin) => {
  return groups.map((group, index) => {
    return {
      creator: getMockUser(),
      id: index,
      members: remove
        ? [{ ...getMockUser(), isAdmin }]
        : [
            { ...getMockUser(), isAdmin },
            { ...getMockUser("MockMember"), isAdmin: false },
          ],
      name: group,
    };
  });
};
