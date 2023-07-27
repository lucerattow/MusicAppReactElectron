import React from 'react';
import { Icon, Image } from "semantic-ui-react";
import { Link, useNavigate } from "react-router-dom";
import { Auth, User } from "../../../api";
import { defaultUser } from "../../../assets";
import "./TopBar.scss";

const authController = new Auth();
const userController = new User();

export function TopBar() {
  //variables
  const navigation = useNavigate();
  const { displayName, photoURL } = userController.getMe();
  const avatar = photoURL || defaultUser;

  //functions
  const goBack = () => {
    navigation(-1);
  };

  const logout = () => {
    authController.logout();
  };

  //render
  return (
    <div className='top-bar'>
      <Icon
        name="angle left"
        className="top-bar__back"
        link
        onClick={goBack}
      />

      <div className='top-bar__right'>
        <Link to="/profile">
          <Image src={avatar} avatar />
          <span>{displayName || "Mi cuenta"}</span>
        </Link>
        <Icon
          name="power"
          link
          onClick={logout}
        />
      </div>
    </div>
  );
}
