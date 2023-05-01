import React from "react";
import Link from "next/link";
import styled from "@emotion/styled";
import { UserContext } from "../context/UserProvider";

const NavBarStyled = styled.header`
  height: 50px;
  width: 100%;
  background: var(--teaAccent);
  border-bottom: 3px solid var(--black30);
  align-items: center;
  display: flex;
  position: sticky;
  justify-content: space-around;
  left: 0;
  z-index: 2;
  top: 0;
  transition: height .3s ease-out;
`



const NavBar = () => {
  const { loggedIn, toggleLogin, publicKey, savePrivateKey } = React.useContext(UserContext);
  const trunc = publicKey.slice(0, 5)

  return (

    <NavBarStyled >
      <Link href='/add-recipe'>
        Add
      </Link>

      {loggedIn ?
        <Link href={`/u/${publicKey}`}>
          {`${trunc}...`}
        </Link>
        :
        <Link href='/'>
          Home
        </Link>
      }


      {!loggedIn ? (
        <Link
          id='login'
          href='/login'
        >
          Login
        </Link>

      ) : (
        <Link
          id='logout'
          href='/'
          onClick={() => {
            savePrivateKey('')
            toggleLogin(false)
          }}
        >
          Logout
        </Link>
      )}

    </NavBarStyled >
  )
}



export default NavBar
