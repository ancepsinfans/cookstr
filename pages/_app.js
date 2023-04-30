import '@/styles/globals.css'
import React from 'react'
import UserProvider from '@/components/context/UserProvider'
import constants from '../styles/constants'
import { createGlobalStyle } from 'styled-components'
import NavBar from '@/components/NavBar/NavBar'


const GlobalStyles = createGlobalStyle`
  :root {
    --accentBlue40: ${constants.accentBlue40};
    --accentBlue45: ${constants.accentBlue45};
    --accentBlue50: ${constants.accentBlue50};
    --accentBlue60: ${constants.accentBlue60};
    --accentBlueMain: ${constants.accentBlueMain};
    --accentBrown35: ${constants.accentBrown35};
    --accentBrown45: ${constants.accentBrown45};
    --accentBrown55: ${constants.accentBrown55};
    --accentBrown65: ${constants.accentBrown65};
    --accentBrownMain: ${constants.accentBrownMain};
    --accentPurple70: ${constants.accentPurple70};
    --accentPurple75: ${constants.accentPurple75};
    --accentPurple80: ${constants.accentPurple80};
    --accentPurple85: ${constants.accentPurple85};
    --accentPurpleMain: ${constants.accentPurpleMain};
    --accentRed75: ${constants.accentRed75};
    --accentRed80: ${constants.accentRed80};
    --accentRed85: ${constants.accentRed85};
    --accentRed90: ${constants.accentRed90};
    --accentRedMain: ${constants.accentRedMain};
    --alertGreen65: ${constants.alertGreen65};
    --alertGreen75: ${constants.alertGreen75};
    --alertGreen85: ${constants.alertGreen85};
    --alertGreen95: ${constants.alertGreen95};
    --alertGreenMain: ${constants.alertGreenMain};
    --alertRed65: ${constants.alertRed65};
    --alertRed75: ${constants.alertRed75};
    --alertRed85: ${constants.alertRed85};
    --alertRed95: ${constants.alertRed95};
    --alertRedMain: ${constants.alertRedMain};
    --alertYellow80: ${constants.alertYellow80};
    --alertYellow90: ${constants.alertYellow90};
    --alertYellow95: ${constants.alertYellow95};
    --alertYellowMain: ${constants.alertYellowMain};
    --black30: ${constants.black30};
    --black40: ${constants.black40};
    --black50: ${constants.black50};
    --black60: ${constants.black60};
    --blackMain: ${constants.blackMain};
    --primary65: ${constants.primary65};
    --primary70: ${constants.primary70};
    --primary75: ${constants.primary75};
    --primary80: ${constants.primary80};
    --primaryMain: ${constants.primaryMain};
    --white: ${constants.white};
    --tooltip-text-color: ${constants.blackMain};
    --tooltip-background-color: ${constants.accentPurpleMain};
    --tooltip-margin: 30px;
    --tooltip-arrow-size: 6px;
  }

  /*
  1. Use a more-intuitive box-sizing model.
*/
*, *::before, *::after {
  box-sizing: border-box;
}

/*
  2. Remove default margin
*/
* {
  margin: 0;
  padding: 0;
  line-height: calc(1em + 0.5rem);
}

/*
  3. Allow percentage-based heights in the application
*/
html, body {
  height: auto;

  background-color: var(--primary80);
  font-family: 'Vollkorn', serif;
}

/*
  Typographic tweaks!
  4. Add accessible line-height
  5. Improve text rendering
*/
body {
  line-height: 1.5;
  -webkit-font-smoothing: antialiased;
  background-color: var(--main-color);
}

/*
  6. Improve media defaults
*/
img, picture, video, canvas, svg, iframe, object {
  display: block;
  max-width: 100%;
}

/*
  7. Remove built-in form typography styles
*/
input, button, textarea, select {
  font: inherit;
}

/*
  8. Avoid text overflows
*/
p, h1, h2, h3, h4, h5, h6, li, dl, dt, blockquote {
  overflow-wrap: break-word;
}

/*
  9. Create a root stacking context
*/
#root, #__next {
  isolation: isolate;
}

a {
  color: var(--accentRedMain);
  text-decoration: none;
}

p {
  padding: 5px;
}
`

export default function App({ Component, pageProps }) {
  return (
    <UserProvider>
      <GlobalStyles />
      <NavBar />
      <Component {...pageProps} />
    </UserProvider>
  )


}
