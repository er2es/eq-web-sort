import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { v4 as uuid } from "uuid";
import ReactHtmlParser from "react-html-parser";
import decodeHTML from "../../utilities/decodeHTML";
import useLocalStorage from "../../utilities/useLocalStorage";
import flatten from "lodash/flatten";
import countBy from "lodash/countBy";

const SurveyRatings10Element = (props) => {
  // HELPER FUNCTIONS
  // filter to remove empty strings if present
  const getOptionsArray = (options) => {
    let array = options.split(";;;");
    array = array.filter(function (e) {
      return e;
    });
    return array;
  };

  // PROPS
  const optsArray = getOptionsArray(props.opts.options);
  const rows = optsArray.length;
  const questionId = `qNum${props.opts.qNum}`;
  const checkRequiredQuestionsComplete = props.check;

  // PERSISTENT STATE
  const [checkedState, setCheckedState] = useLocalStorage(
    questionId,
    Array.from({ length: rows }, () => Array.from({ length: 10 }, () => false))
  );

  // set default
  useEffect(() => {
    const resultsSurvey =
      JSON.parse(localStorage.getItem("resultsSurvey")) || {};
    if (
      resultsSurvey[`qNum${props.opts.qNum}`] === undefined ||
      resultsSurvey[`qNum${props.opts.qNum}`] === null ||
      resultsSurvey[`qNum${props.opts.qNum}`] === ""
    ) {
      if (props.opts.required === true) {
        resultsSurvey[`qNum${props.opts.qNum}`] = "no-*?*-response";
      } else {
        resultsSurvey[`qNum${props.opts.qNum}`] = "no response";
      }
    }
    localStorage.setItem("resultsSurvey", JSON.stringify(resultsSurvey));
  }, [props.opts.qNum, props.opts.required]);

  // LOCAL STATE
  const [formatOptions, setFormatOptions] = useState({
    bgColor: "whitesmoke",
    border: "none",
  });
  const [localStore, setLocalStore] = useState({});

  // *** HANDLE CHANGE ***
  const handleChange = (selectedRow, column, e) => {
    const resultsSurvey = JSON.parse(localStorage.getItem("resultsSurvey"));
    let name = e.target.name;
    let value = e.target.value;
    const newObj = localStore;
    newObj[name] = value;
    setLocalStore(newObj);
    const newArray = [];
    const newCheckedState = checkedState.map(function (row, index) {
      if (selectedRow === index) {
        row.map(function (item, index) {
          if (column === index) {
            newArray.push(true);
            return null;
          } else {
            newArray.push(false);
            return null;
          }
        });
        return newArray;
      } else {
        return row;
      }
    });
    setCheckedState(newCheckedState);
    if (newCheckedState.length > 0) {
      resultsSurvey[`qNum${props.opts.qNum}`] = [...newCheckedState];
    } else {
      if (props.opts.required === true) {
        resultsSurvey[`qNum${props.opts.qNum}`] = "no-*?*-response";
      } else {
        resultsSurvey[`qNum${props.opts.qNum}`] = "no response";
      }
    }
    localStorage.setItem("resultsSurvey", JSON.stringify(resultsSurvey));
  }; // end handleChange

  // ****** CHECK IF ALL PARTS ANSWERED *******
  let setYellow = false;
  let arrayLen = checkedState.length;
  let flattenedCheckedState = flatten([...checkedState]);
  let count = countBy(flattenedCheckedState);
  let objTestValue = count[true] || 0;
  if (objTestValue < arrayLen) {
    setYellow = true;
  }

  useEffect(() => {
    // if is a required question, check if all parts answered
    if (
      (props.opts.required === true || props.opts.required === "true") &&
      checkRequiredQuestionsComplete === true &&
      setYellow
    ) {
      setFormatOptions({ bgColor: "#fde047", border: "3px dashed black" });
    } else {
      setFormatOptions({
        bgColor: "whitesmoke",
        border: "none",
      });
    }
  }, [checkRequiredQuestionsComplete, setYellow, props.opts.required]);

  const RadioItems = () => {
    const radioList = optsArray.map((item, index) => {
      const itemText = ReactHtmlParser(decodeHTML(item));
      return (
        <ItemContainer indexVal={index} key={uuid()}>
          <OptionsText key={uuid()}>{itemText}</OptionsText>
          <RadioInput
            key={uuid()}
            id={`Q-${index}`}
            type="radio"
            value={1}
            name={`qNum${props.opts.qNum}-${index + 1}`}
            onChange={(e) => handleChange(index, 0, e)}
            checked={checkedState[index][0]}
          />
          <RadioInput
            key={uuid()}
            id={`Q2-${index}`}
            type="radio"
            value={2}
            name={`qNum${props.opts.qNum}-${index + 1}`}
            onChange={(e) => handleChange(index, 1, e)}
            checked={checkedState[index][1]}
          />
          <RadioInput
            key={uuid()}
            id={`Q3-${index}`}
            type="radio"
            value={3}
            name={`qNum${props.opts.qNum}-${index + 1}`}
            onChange={(e) => handleChange(index, 2, e)}
            checked={checkedState[index][2]}
          />
          <RadioInput
            key={uuid()}
            id={`Q4-${index}`}
            type="radio"
            value={4}
            name={`qNum${props.opts.qNum}-${index + 1}`}
            onChange={(e) => handleChange(index, 3, e)}
            checked={checkedState[index][3]}
          />
          <RadioInput
            key={uuid()}
            id={`Q5-${index}`}
            type="radio"
            value={5}
            name={`qNum${props.opts.qNum}-${index + 1}`}
            onChange={(e) => handleChange(index, 4, e)}
            checked={checkedState[index][4]}
          />
          <RadioInput
            key={uuid()}
            id={`Q6-${index}`}
            type="radio"
            value={6}
            name={`qNum${props.opts.qNum}-${index + 1}`}
            onChange={(e) => handleChange(index, 5, e)}
            checked={checkedState[index][5]}
          />
          <RadioInput
            key={uuid()}
            id={`Q7-${index}`}
            type="radio"
            value={7}
            name={`qNum${props.opts.qNum}-${index + 1}`}
            onChange={(e) => handleChange(index, 6, e)}
            checked={checkedState[index][6]}
          />
          <RadioInput
            key={uuid()}
            id={`Q8-${index}`}
            type="radio"
            value={8}
            name={`qNum${props.opts.qNum}-${index + 1}`}
            onChange={(e) => handleChange(index, 7, e)}
            checked={checkedState[index][7]}
          />
          <RadioInput
            key={uuid()}
            id={`Q9-${index}`}
            type="radio"
            value={9}
            name={`qNum${props.opts.qNum}-${index + 1}`}
            onChange={(e) => handleChange(index, 8, e)}
            checked={checkedState[index][8]}
          />
          <RadioInput
            key={uuid()}
            id={`Q10-${index}`}
            type="radio"
            value={10}
            name={`qNum${props.opts.qNum}-${index + 1}`}
            onChange={(e) => handleChange(index, 9, e)}
            checked={checkedState[index][9]}
          />
        </ItemContainer>
      );
    });
    return <div>{radioList}</div>;
  };

  const labelText = ReactHtmlParser(decodeHTML(props.opts.label));

  return (
    <Container bgColor={formatOptions.bgColor} border={formatOptions.border}>
      <TitleBar>
        <div>{labelText}</div>
      </TitleBar>
      <RadioContainer>
        <RatingTitle>
          <div />
          <CircleDiv>1</CircleDiv>
          <CircleDiv>2</CircleDiv>
          <CircleDiv>3</CircleDiv>
          <CircleDiv>4</CircleDiv>
          <CircleDiv>5</CircleDiv>
          <CircleDiv>6</CircleDiv>
          <CircleDiv>7</CircleDiv>
          <CircleDiv>8</CircleDiv>
          <CircleDiv>9</CircleDiv>
          <CircleDiv>10</CircleDiv>
        </RatingTitle>
        <RadioItems />
      </RadioContainer>
    </Container>
  );
};

export default SurveyRatings10Element;

const Container = styled.div`
  width: 90vw;
  padding: 20px;
  margin-left: 20px;
  margin-right: 20px;
  max-width: 1300px;
  min-height: 200px;
  background-color: ${(props) => props.bgColor};
  outline: ${(props) => props.border};
  outline-offset: -3px;
`;

const TitleBar = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 50px;
  padding: 5px;
  font-size: 18px;
  text-align: center;
  background-color: lightgray;
  width: 100%;
  border-radius: 3px;
`;

const RadioContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: left;
  align-items: left;
  padding: 20px;
  vertical-align: center;
  margin-top: 0px;
  height: auto;
  min-height: 50px;
  font-size: 18px;
  background-color: white;
  width: 100%;
  border-radius: 3px;
  border: 2px solid lightgray;

  input {
    margin-top: 8px;
  }

  label {
    margin-left: 8px;
  }
`;

const ItemContainer = styled.div`
  display: inline-grid;
  grid-template-columns: minmax(30%, 800px) 40px 40px 40px 40px 40px 40px 40px 40px 40px 40px 40px;
  margin-bottom: 17px;
  font-size: 16px;
  align-items: end;
  padding-bottom: 8px;
  height: 40px;
  background-color: ${(props) => (props.indexVal % 2 ? "white" : "#ececec")};
  border-radius: 3px;
  &:hover {
    background-color: rgba(131, 202, 254, 0.4);
  }
`;

const RatingTitle = styled.div`
  display: inline-grid;
  grid-template-columns: minmax(30%, 800px) 40px 40px 40px 40px 40px 40px 40px 40px 40px 40px 40px;
  margin-bottom: 7px;
  align-items: end;
`;

const CircleDiv = styled.div`
  display: flex;
  justify-self: center;
  align-items: center;
  text-align: center;
`;

const RadioInput = styled.input`
  display: flex;
  justify-self: center;
  align-self: center;
  text-align: center;
  border: 0px;
  width: 100%;
  height: 1.4em;
`;

const OptionsText = styled.span`
  margin-bottom: 2px;
  padding-left: 5px;
`;
