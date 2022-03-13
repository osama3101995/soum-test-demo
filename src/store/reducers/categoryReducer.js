export const UPDATE_CATEGORY = "updateCategory";

const categoryReducer = (state = 0, action) => {
  switch (action.type) {
    case UPDATE_CATEGORY:
      return action.payload;

    default:
      return state;
  }
};

export default categoryReducer;
