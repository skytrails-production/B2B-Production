const initialState = {
  formEntries: [
    {
      name: "",
      dob: "",
      gender: ""

    }
  ],
};

export default function formReducer(state = initialState, action) {
  switch (action.type) {
    case "ADD_FORM_ENTRY":
      return {
        ...state,
        formEntries: [...state.formEntries, action.formData],
      };
    case "DELETE_FORM_ENTRY":
      const updatedEntries = [...state.formEntries];
      updatedEntries.splice(action.index, 1);
      return {
        ...state,
        formEntries: updatedEntries,
      };
    case "CLEAR_ALL_PACKAGES":
      return {
        formEntries: [
          {
            name: "",
            dob: "",
            gender: ""

          }
        ],
      };
    default:
      return state;
  }
}
