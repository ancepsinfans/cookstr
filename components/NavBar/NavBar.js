import React from "react";
import Link from "next/link";
import styled from "@emotion/styled";
import { getPublicKey } from "nostr-tools";
import { UserContext } from "../context/UserProvider";
import { useRouter } from "next/router";

const NavBarStyled = styled.header`
  height: 50px;
  width: 100%;
  background: var(--primaryMain);
  border-bottom: 3px solid var(--accentBlue40);
  align-items: center;
  display: flex;
  position: sticky;
  justify-content: space-around;
  left: 0;
  z-index: 2;
  top: 0;
  transition: height .3s ease-out;
`



const Back = styled.div`
width: 50px;
  text-decoration: none;
  font-weight: 700;
  cursor: pointer;
`

const NavBar = () => {
  const { loggedIn, toggleLogin, publicKey, savePrivateKey } = React.useContext(UserContext);
  const router = useRouter()
  const trunc = publicKey.slice(0, 5)
  // let publicKey, trunc
  // if (loggedIn) {
  //   publicKey = getPublicKey(privateKey)
  //   
  // }
  console.log(publicKey)
  return (

    <NavBarStyled >
      <Back>
        {
          router.asPath === '/' ?
            <Link href='/'>
              Home
            </Link> :
            null
        }

      </Back>

      {loggedIn ?
        <Link href={`/u/${publicKey}`}>
          {`${trunc}...`}
        </Link>
        : null
      }

      <div>
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
      </div>
    </NavBarStyled >
  )
}



export default NavBar
