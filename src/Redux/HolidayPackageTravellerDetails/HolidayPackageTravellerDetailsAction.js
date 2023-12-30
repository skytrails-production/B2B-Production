export const addFormEntry = (formData) => ({
  type: "ADD_FORM_ENTRY",
  formData,
});
export const deleteFormEntry = (index) => ({
  type: "DELETE_FORM_ENTRY",
  index,
});
export const clearHolidayPackage=()=>({
  type:"CLEAR_ALL_PACKAGES",
})