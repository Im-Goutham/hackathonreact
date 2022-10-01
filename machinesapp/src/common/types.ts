import { FIELD } from "./enum";

export type CategoryDataType = {
    id: string;
  name: string;
  titleField: string;
  fields: Array<FieldType>;
};

export type FieldType = {
  type: FIELD;
  value: string;
};

export type CategoryState = {
  categories: Array<CategoryDataType>;
};
