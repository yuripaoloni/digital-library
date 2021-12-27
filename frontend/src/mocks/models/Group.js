import { getMockUser } from "./User";

export const getMockGroup = (groups, remove) => {
  return groups.map((group, index) => {
    return {
      creator: getMockUser(),
      id: index,
      members: remove
        ? [getMockUser()]
        : [getMockUser(), getMockUser("MockMember")],
      name: group,
    };
  });
};
