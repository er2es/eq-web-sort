import React from "react";
import styled from "styled-components";
import ReactHtmlParser from "react-html-parser";
import decodeHTML from "../../utilities/decodeHTML";
import useSettingsStore from "../globalState/useSettingsStore";

const LoadingScreen = () => {
  // STATE
  const langObj = useSettingsStore((state) => state.langObj);
  const message = ReactHtmlParser(decodeHTML(langObj.stepCompleteMessage));

  return (
    <Container>
      <TextDiv>{message}</TextDiv>
    </Container>
  );
};

export default LoadingScreen;

const Container = styled.div`
  display: flex;
  flex-direction: row;
  height: 100vh;
  justify-content: center;
  align-items: center;
`;

const TextDiv = styled.div`
  font-size: 88px;
  /* font-style: italic; */
  font-weight: bold;
  align-self: center;
  margin-right: 70px;
  margin-top: 40px;
`;
