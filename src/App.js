import React, { useContext } from 'react'
import Ingredients from "./components/Ingredients/Ingredients";
import Auth from "./components/Auth/Auth";
import { AuthContext } from './store/auth-context';

function App() {
  const authCtx = useContext(AuthContext);
  console.log(authCtx.isLoggedIn);

  let content = <Auth />
  if (authCtx.isLoggedIn) {
    content = <Ingredients />
  }

  return (
    content
  );
}

export default App;
