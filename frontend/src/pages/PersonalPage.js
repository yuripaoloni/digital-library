import React from "react";
import { useSelector } from "react-redux";

/**
 * TODO
 * - profile image (?)
 * - personal info (username, name, surname, email)
 * - list of available groups (to do defined better)
 * - list of saved books
 */

const PersonalPage = () => {
  /**
   * should have: user.name, user.surname, user.email. user.groups, user.
   */

  const user = useSelector((state) => state.auth.user);

  return <div></div>;
};

export default PersonalPage;
