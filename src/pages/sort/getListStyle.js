import useStore from "../../globalState/useStore";

// card and column styling
const getListStyle = (
  isDraggingOver,
  props,
  forcedSorts,
  columnWidth,
  columnColor,
  cardHeight
) => {
  // forcedSorts is "warnOverloadedColumn" in configObj
  let isUnderMaxCards;
  if (forcedSorts === true) {
    isUnderMaxCards = props.columnStatementsArray.length <= props.maxCards;
  } else {
    isUnderMaxCards = true;
  }

  // to set highlighting for column headers
  if (isDraggingOver) {
    useStore.setState({ draggingOverColumnId: props.columnId });
  }

  return {
    background: isDraggingOver
      ? "lightblue"
      : isUnderMaxCards
      ? columnColor
      : "orange",
    padding: `3px 2px 0px 2px`,

    minWidth: columnWidth + 13,
    marginTop: 0,
    marginRight: 0,
    minHeight: props.minHeight - 10,
    marginBottom: cardHeight + 80,
    borderRadius: `2px`,
    border: isUnderMaxCards ? "1px solid #d8d8d8" : "2px dashed black",
  };
};

export default getListStyle;

// border: 'solid 1px #ededed',
