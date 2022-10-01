import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { FIELD } from "../../common/enum";
import {
  CategoryDataType,
  CategoryState,
  ItemDataType,
  ItemFieldType,
} from "../../common/types";

const initialState: CategoryState = {
  categories: [
    {
      id: "id1d837fff543c22",
      name: "Category 1",
      titleField: "id1d837fffbsdbdsbd543c22",
      fields: [
        { id: "id1d837fffbsdbdsbd543c22", type: FIELD.TEXT, value: "Title" },
      ],
      items: [],
    },
    {
      id: "id1d837cfff5sfsdv3c22",
      name: "Category 2",
      titleField: "id1d837sssfffbsvvddd22",
      fields: [
        { id: "id1d837sssfffbsvvddd22", type: FIELD.TEXT, value: "Title" },
      ],
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
      state.selectedCategory = undefined;
      const index = state.categories.findIndex((obj) => {
        return obj.id === action.payload;
      });
      state.selectedCategory = state.categories[index];
    },
    addCategory: (state, action) => {
      state.categories = [...state.categories, action.payload];
    },
    saveCategory: (state, action: PayloadAction<CategoryDataType>) => {
      const updatedCategories = [...state.categories];
      const index = updatedCategories.findIndex((obj) => {
        return obj.id === action.payload.id;
      });
      updatedCategories[index] = { ...action.payload };

      const findExistingItemFieldValue = (
        id: string,
        items: Array<ItemFieldType>
      ) => {
        const itemIndex = items.findIndex((obj: ItemFieldType) => {
          return obj.fieldId === id;
        });
        if (itemIndex > -1) {
          return items[itemIndex].value;
        } else {
          return "";
        }
      };
      const updatedItems = [...updatedCategories[index].items];
      updatedItems.forEach((item: ItemDataType, key) => {
        const updatedItemFields = updatedCategories[index].fields.map(
          (field) => {
            return {
              fieldId: field.id,
              type: field.type,
              label: field.value,
              value: findExistingItemFieldValue(field.id, item.fields),
            };
          }
        );
        updatedItems[key] = {
          id: item.id,
          fields: updatedItemFields,
        };
      });
      updatedCategories[index].items = [...updatedItems];
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
      const itemsFields = updatedCategories[index].fields.map((field) => {
        return {
          fieldId: field.id,
          type: field.type,
          label: field.value,
          value: "",
        };
      });
      updatedCategories[index].items = [
        ...updatedCategories[index].items,
        { ...action.payload.data, fields: itemsFields },
      ];

      state.categories = [...updatedCategories];
    },
    saveItem: (state, action) => {
      const updatedCategories = [...state.categories];
      const index = updatedCategories.findIndex((obj) => {
        return obj.id == action.payload.catId;
      });
      const itemIndex = updatedCategories[index].items.findIndex((obj) => {
        return obj.id == action.payload.data.id;
      });
      updatedCategories[index].items[itemIndex] = { ...action.payload.data };
      state.categories = [...updatedCategories];
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
    },
  },
});

export const {
  getCategory,
  addCategory,
  saveCategory,
  removeCategory,
  addItem,
  saveItem,
  removeItem,
} = categorySlice.actions;
export default categorySlice.reducer;
