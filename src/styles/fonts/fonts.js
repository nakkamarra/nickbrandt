import { createGlobalStyle } from 'styled-components';

import OxygenSansWoff from './Oxygen-Sans/oxygen-sans-regular-webfont.woff';
import OxygenSansTtf from './Oxygen-Sans/oxygen-sans-regular-webfont.ttf';
import OxygenSansEot from './Oxygen-Sans/oxygen-sans-regular-webfont.eot';
import OxygenSansBoldWoff from './Oxygen-Sans/oxygen-sans-bold-webfont.woff';
import OxygenSansBoldTtf from './Oxygen-Sans/oxygen-sans-bold-webfont.ttf';
import OxygenSansBoldEot from './Oxygen-Sans/oxygen-sans-bold-webfont.eot';
import MontserratRegularWoff2 from './Montserrat/Montserrat-Regular.woff2';
import MontserratRegularWoff from './Montserrat/Montserrat-Regular.woff';
import MontserratRegularEot from './Montserrat/Montserrat-Regular.eot';
import MontserratItalicWoff2 from './Montserrat/Montserrat-Italic.woff2';
import MontserratItalicWoff from './Montserrat/Montserrat-Italic.woff';
import MontserratItalicEot from './Montserrat/Montserrat-Italic.eot';

export const GlobalFonts = createGlobalStyle`
  /* Oxygen-Sans */

  @font-face {
    font-family: 'Oxygen-Sans';
    src: 
      local('Oxygen-Sans'),
      url(${OxygenSansWoff}) format('woff'),
      url(${OxygenSansTtf}), format('ttf'),
      url(${OxygenSansEot}) format('embedded-opentype');
    font-weight: 300;
    font-style: normal;
  }
  
  @font-face {
    font-family: 'Oxygen-Sans';
    src: 
      local('Oxygen-Sans'),
      url(${OxygenSansBoldWoff}) format('woff'),
      url(${OxygenSansBoldTtf}), format('ttf'),
      url(${OxygenSansBoldEot}) format('embedded-opentype');
    font-weight: 700;
    font-style: normal;
  }

  /* Montserrat */

  @font-face {
    font-family: 'Montserrat';
    src: 
      local('Montserrat-Regular'),
      url(${MontserratRegularWoff2}) format('woff2'),
      url(${MontserratRegularWoff}) format('woff'), 
      url(${MontserratRegularEot}) format('embedded-opentype');
    font-weight: 300;
    font-style: normal;
  }

  @font-face {
    font-family: 'Montserrat';
    src: 
      local('Montserrat-Italic'),
      url(${MontserratItalicWoff2}) format('woff2'),
      url(${MontserratItalicWoff}) format('woff'), 
      url(${MontserratItalicEot}) format('embedded-opentype');
    font-weight: 300;
    font-style: italic;
  }
`;