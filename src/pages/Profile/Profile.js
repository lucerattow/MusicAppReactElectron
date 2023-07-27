import React, { useState } from 'react';
import { Button } from "semantic-ui-react";
import { AvatarUpdate, DisplayNameUpdateForm, EmailUpdateForm, PasswordUpdateForm } from "../../components/Profile";
import { BasicModal } from "../../components/Shared";
import { User } from "../../api";
import "./Profile.scss";

const userController = new User();

export function Profile() {
  //variables
  const [showModal, setShowModal] = useState(false);
  const [titleModal, setTitleModal] = useState("");
  const [contentModal, setContentModal] = useState(null);

  const { displayName, email } = userController.getMe();

  //functions
  const updateDisplayName = () => {
    setTitleModal("Actualizar nombre y apellido");
    setContentModal(<DisplayNameUpdateForm onClose={onCloseModal} />);
    setShowModal(true);
  };
  const updateEmail = () => {
    setTitleModal("Actualizar correo electrónico");
    setContentModal(<EmailUpdateForm onClose={onCloseModal} />);
    setShowModal(true);
  };
  const updatePassword = () => {
    setTitleModal("Cambio de contraseña");
    setContentModal(<PasswordUpdateForm onClose={onCloseModal} />);
    setShowModal(true);
  };
  const onCloseModal = () => {
    setShowModal(false);
    setTitleModal("");
    setContentModal(null);
  };

  //render
  return (
    <>
      <div className='profile'>
        <h1>Configuración</h1>
        <div className='profile__block'>
          <div>
            <AvatarUpdate />
            <span>{displayName}</span>
          </div>
          <Button onClick={updateDisplayName}>
            Actualizar
          </Button>
        </div>

        <div className='profile__block'>
          <span>Correo electrónico: {email}</span>
          <Button onClick={updateEmail}>
            Actualizar
          </Button>
        </div>

        <div className='profile__block'>
          <span>Contraseña: ●●●●● </span>
          <Button onClick={updatePassword}>
            Actualizar
          </Button>
        </div>
      </div>
      <BasicModal show={showModal} onClose={onCloseModal} title={titleModal}>
        {contentModal}
      </BasicModal>
    </>
  );
}
