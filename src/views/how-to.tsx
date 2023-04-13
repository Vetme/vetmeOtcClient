import React from "react";
import styled from "styled-components";

const HowToWrapper = styled.div`
  width: 640px;
  max-width: 100%;
  margin: auto;

  iframe {
    margin: auto;
    display: flex;
  }

  @media (max-width: 640px;) {
    width: 100%;
    margin: auto;
  }
`;

const HowTo = () => {
  return (
    <HowToWrapper>
      <iframe
        width="90%"
        height="315"
        src="https://www.youtube.com/embed/QfW2CPW1jx4"
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
      ></iframe>
    </HowToWrapper>
  );
};

export default HowTo;
