import { FIELD } from "./enum";

export type CategoryDataType = {
  id: string;
  name: string;
  titleField: string;
  fields: Array<FieldType>;
  items: Array<ItemDataType>;
};

export type FieldType = {
  id: string;
  type: FIELD;
  value: string;
};

export type CategoryState = {
  categories: Array<CategoryDataType>;
  selectedCategory?: CategoryDataType;
};

export type ItemDataType = {
  id: string;
  fields: Array<ItemFieldType>;
};

export type ItemFieldType = { fieldId: string; type: FIELD;label: string; value: string };
