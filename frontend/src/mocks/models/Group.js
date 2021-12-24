import { getMockUser } from "./User";

export const getMockGroup = (groups, user) => {
  return groups.map((group) => {
    return {
      creator: getMockUser(),
      id: 1,
      members: [getMockUser(), user && getMockUser(user)],
      name: group,
    };
  });
};
