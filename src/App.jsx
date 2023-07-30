import React, { useState } from "react";
// import { Button } from "semantic-ui-react"
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { LoggedNavigation } from "./routes";
import { Auth } from "./pages";

function App() {
  const [user, setUser] = useState(undefined);
  const auth = getAuth();

  onAuthStateChanged(auth, (user) => {
    setUser(user);
  });

  if (user === undefined) return null;

  if (user)
  {
    return <LoggedNavigation />;
  }
  else
  {
    return <Auth />;
  }
}

export default App;
