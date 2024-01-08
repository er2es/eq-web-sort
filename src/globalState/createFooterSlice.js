const createFooterSlice = (set, get) => ({
  cardFontSize: 15,
  cardFontSizeSort: 15,
  cardFontSizePostsort: 15,
  currentPage: "landing",
  progressScore: 10,
  progressScoreAdditional: 0,
  progressScoreAdditionalSort: 0,
  displayNextButton: false,

  setCardFontSizePostsort: (inputValue) => {
    set(() => ({ cardFontSizePostsort: inputValue }));
  },
  setCardFontSizeSort: (inputValue) => {
    set(() => ({ cardFontSizeSort: inputValue }));
  },
  setCardFontSize: (inputValue) => {
    set(() => ({ cardFontSize: inputValue }));
  },
  setCurrentPage: (inputValue) => {
    set(() => ({ currentPage: inputValue }));
  },
  setProgressScore: (inputValue) => {
    set(() => ({ progressScore: inputValue }));
  },
  setProgressScoreAdditional: (inputValue) => {
    set(() => ({ progressScoreAdditional: inputValue }));
  },
  setProgressScoreAdditionalSort: (inputValue) => {
    set(() => ({ progressScoreAdditionalSort: inputValue }));
  },
  setDisplayNextButton: (inputValue) => {
    set(() => ({ displayNextButton: inputValue }));
  },
});

export default createFooterSlice;
