import React from 'react'
import { Button } from 'semantic-ui-react'
import "./AuthOptions.scss"

export function AuthOptions({ openLogin, openRegister }) {
  //Renderizado
  return (
    <div className='auth-options'>
      <h1>Millones de canciones, gratis en MUSIC!</h1>
      <Button className='register' primary onClick={openRegister} >
        Registrate gratis
      </Button>
      <Button className='login' secondary onClick={openLogin} >
        Iniciar sesión
      </Button>
    </div>
  )
}
