import { createSlice } from "@reduxjs/toolkit";
import { FIELD } from "../../common/enum";
import { CategoryState } from "../../common/types";

const initialState: CategoryState = {
  categories: [
    {
      id: "id1d837fff543c22",
      name: "Category 1",
      titleField: "title",
      fields: [{ type: FIELD.TEXT, value: "Title" }],
    },
    {
      id: "id1d837cfff5sfsdv3c22",
      name: "Category 2",
      titleField: "model",
      fields: [{ type: FIELD.TEXT, value: "Title" }],
    },
  ],
};

const categorySlice = createSlice({
  name: "categorySlice",
  initialState,
  reducers: {
    addCategory: (state, action) => {
      state.categories = [...state.categories, action.payload];
    },
    saveCategory: (state, action) => {
      const updatedCategories = [...state.categories];
      const index = updatedCategories.findIndex((obj) => {
        return obj.id === action.payload.id;
      });
      updatedCategories[index] = { ...action.payload };
      state.categories = [...updatedCategories];
    },
    removeCategory: (state, action) => {
      const updatedCategories = [...state.categories];
      const index = updatedCategories.findIndex((obj) => {
        return obj.id === action.payload.id;
      });
      updatedCategories.splice(index, 1);
      state.categories = [...updatedCategories];
    },
  },
});

export const { addCategory, saveCategory, removeCategory } =
  categorySlice.actions;
export default categorySlice.reducer;
