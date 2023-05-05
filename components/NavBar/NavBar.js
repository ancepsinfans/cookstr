import React from "react";
import Link from "next/link";
import styled from "@emotion/styled";
import { UserContext } from "../context/UserProvider";
import { useRouter } from "next/router";

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
  const router = useRouter()
  const { loggedIn, toggleLogin, publicKey, savePrivateKey } = React.useContext(UserContext);

  const toUserProfile = (
    <Link href={`/u/${publicKey}`}>
      {`${publicKey?.slice(0, 5)}...`}
    </Link>
  )
  const toBookmarks = (
    <Link href={`/u/${publicKey}`}>
      {`${publicKey?.slice(0, 5)}...`}
    </Link>
  )

  return (

    <NavBarStyled >
      <div style={{ flexBasis: '25%', textAlign: 'center' }} >
        <Link href='/add-recipe'>
          Add
        </Link>
      </div>

      <div style={{ flexBasis: '50%', textAlign: 'center' }}>
        {router.asPath !== '/' ?

          <Link
            style={{ fontSize: 'x-large' }}
            href='/'>
            🍳
          </Link>
          : (toUserProfile)
        }
      </div>


      <div style={{ flexBasis: '25%', textAlign: 'center' }} >
        {!loggedIn ? (
          <Link
            id='login'
            href='/login'
          >
            Login
          </Link>

        ) : (

          <div>
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
            {router.asPath !== '/' ?
              (<>
                {' // '}{toUserProfile}
              </>) :
              null}
          </div>
        )}
      </div>
    </NavBarStyled >
  )
}



export default NavBar
