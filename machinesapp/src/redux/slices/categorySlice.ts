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
      items: [],
    },
    {
      id: "id1d837cfff5sfsdv3c22",
      name: "Category 2",
      titleField: "model",
      fields: [{ type: FIELD.TEXT, value: "Title" }],
      items: [],
    },
  ],
  selectedCategory: undefined,
};

const categorySlice = createSlice({
  name: "categorySlice",
  initialState,
  reducers: {
    getCategory: (state, action) => {
      const index = state.categories.findIndex((obj) => {
        return obj.id === action.payload;
      });
      state.selectedCategory = state.categories[index];
    },
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
    addItem: (state, action) => {
      const updatedCategories = [...state.categories];
      const index = updatedCategories.findIndex((obj) => {
        return obj.id == action.payload.catId;
      });
      updatedCategories[index].items = [
        ...updatedCategories[index].items,
        action.payload.data,
      ];

      state.categories = [...updatedCategories];
      getCategory(action.payload.catId);
    },
    removeItem: (state, action) => {
      const updatedCategories = [...state.categories];
      const index = updatedCategories.findIndex((obj) => {
        return obj.id == action.payload.catId;
      });

      const itemIndex = updatedCategories[index].items.findIndex((obj) => {
        return obj.id == action.payload.itemId;
      });
      updatedCategories[index].items.splice(itemIndex, 1);
      state.categories = [...updatedCategories];
      getCategory(action.payload.catId);
    },
  },
});

export const {
  getCategory,
  addCategory,
  saveCategory,
  removeCategory,
  addItem,
  removeItem
} = categorySlice.actions;
export default categorySlice.reducer;
