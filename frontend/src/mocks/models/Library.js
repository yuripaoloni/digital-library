export const getMockLibraries = (names) => {
  return names.map((name, index) => {
    return {
      icon: `icon-${index}`,
      id: index,
      name: name,
      url: `url-${index}`,
    };
  });
};
