import React from 'react'
import { Button } from "semantic-ui-react"
import { Auth } from "../../api"
import "./Home.scss"

const auth = new Auth();

export function Home() {
  return (
    <div>
      <h1>Home Screen</h1>
      <Button primary onClick={auth.logout}>Cerrar sesion</Button>
    </div>
  )
}
