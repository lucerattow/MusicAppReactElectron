import React, { useState } from "react";
import { Image } from "semantic-ui-react";
import { AuthOptions, LoginForm, RegisterForm } from "../../components";
import { logoNameWhite } from "../../assets";
import "./Auth.scss";

export function Auth() {
  const [typeForm, setTypeForm] = useState(null);

  const openLogin = () => setTypeForm("login");
  const openRegister = () => setTypeForm("register");
  const goBack = () => setTypeForm(null);

  const renderForm = () => {
    if (typeForm === "login") {
      return <LoginForm goBack={goBack} openRegister={openRegister} />;
    }
    if (typeForm === "register") {
      return <RegisterForm openLogin={openLogin} goBack={goBack} />;
    }
    return <AuthOptions openLogin={openLogin} openRegister={openRegister} />;
  };

  return (
    <div className="auth">
      <div className="auth__content">
        <Image
          src={logoNameWhite}
          alt="Music"
          className="auth__content-logo"
        />

        {renderForm()}
      </div>
    </div>
  );
}