import React from "react";
import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";
import { view } from "@risingstack/react-easy-state";
import styled from "styled-components";
import ReactHtmlParser from "react-html-parser";
import decodeHTML from "./decodeHTML";
import useSettingsStore from "../globalState/useSettingsStore";
import useStore from "../globalState/useStore";

const SortingFinishedModal = () => {
  // STATE
  const langObj = useSettingsStore((state) => state.langObj);
  const triggerSortingFinishedModal = useStore(
    (state) => state.triggerSortingFinishedModal
  );
  const setTriggerSortingFinishedModal = useStore(
    (state) => state.setTriggerSortingFinishedModal
  );

  const helpModalHead = ReactHtmlParser(
    decodeHTML(langObj.sortingCompleteModalHead)
  );
  const helpModalText = ReactHtmlParser(
    decodeHTML(langObj.sortingCompleteModalText)
  );

  // const onOpenModal = () => setOpen(true);
  const onCloseModal = () => {
    setTriggerSortingFinishedModal(false);
  };

  return (
    <Modal
      className="customModal"
      open={triggerSortingFinishedModal}
      onClose={onCloseModal}
      center
    >
      <ModalHeader>{helpModalHead}</ModalHeader>
      <hr />
      <ModalContent>{helpModalText}</ModalContent>
    </Modal>
  );
};

export default view(SortingFinishedModal);

const ModalHeader = styled.div`
  font-size: 24px;
  line-height: 1.42;
  padding: 10px 0px 10px 0px;

  hr {
    color: black;
  }
`;

const ModalContent = styled.div`
  margin-top: 15px;
`;

// react-responsive-modal-overlay
