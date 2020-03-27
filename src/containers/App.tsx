import React from 'react';
import { GlobalFonts } from '../styles/fonts/fonts';
import { StyledHeading } from '../ui/Heading';
import { StyledParagraph } from '../ui/Paragraph';
import { Social } from '../components/Social';

export const App: React.FC = () => (
  <>
    <GlobalFonts />
    <StyledHeading>
      Nick Brandt
    </StyledHeading>
    <StyledParagraph>
      Hello, my name is Nick Brandt.
      Marfa chambray mumblecore fashion axe try-hard umami
      freegan trust fund helvetica beard.
      Subway tile bespoke quinoa bushwick pork belly lumbersexual.
      Pug tousled gentrify man braid flexitarian edison bulb
      chambray prism vice lomo neutra art party mumblecore.
      Tumeric truffaut dreamcatcher squid deep v slow-carb.
    </StyledParagraph>
    <StyledParagraph>
      Chicharrones kitsch viral kombucha flexitarian meh franzen
      synth lumbersexual. Iceland slow-carb chartreuse +1 live-edge
      everyday carry cold-pressed fingerstache coloring book scenester
      pitchfork enamel pin tote bag small batch messenger bag. Pork
      belly drinking vinegar salvia man braid woke YOLO knausgaard
      next level plaid lyft. Biodiesel fingerstache tumeric photo booth,
      chambray blue bottle migas kale chips fanny pack polaroid pour-over
      coloring book master cleanse aesthetic. Chia trust fund lo-fi,
      lomo pour-over waistcoat thundercats meggings roof party leggings.
    </StyledParagraph>
    <Social />
  </>
);