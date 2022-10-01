import { useDispatch, useSelector } from "react-redux";
import { Button, Grid } from "semantic-ui-react";
import { FIELD } from "../../common/enum";
import { CategoryDataType, CategoryState } from "../../common/types";
import { generateID } from "../../common/utils";
import AddCategory from "../../components/AddCategory";
import {
  addCategory,
  removeCategory,
  saveCategory,
} from "../../redux/slices/categorySlice";

function ManageCategories() {
  const dispatch = useDispatch();
  const categories = useSelector((state: CategoryState) => state.categories);

  const handleAddCategory = () => {
    const id = generateID();
    dispatch(
      addCategory({
        id,
        name: "New Category",
        titleField: "title",
        fields: [{ type: FIELD.TEXT, value: "Title" }],
      })
    );
  };

  const handleSaveCategory = (data: CategoryDataType) => {
    dispatch(saveCategory(data));
  };

  const handleRemoveCategory = (id: string) => {
    dispatch(removeCategory(id));
  };
  return (
    <Grid>
      {categories.map((data) => {
        return (
          <Grid.Column mobile={16} tablet={8} computer={5} key={data.id}>
            <AddCategory
              data={data}
              onSubmit={handleSaveCategory}
              onRemove={handleRemoveCategory}
            />
          </Grid.Column>
        );
      })}
      <Grid.Column mobile={16} tablet={8} computer={5}>
        <Button primary onClick={handleAddCategory}>
          Add Category
        </Button>
      </Grid.Column>
    </Grid>
  );
}

export default ManageCategories;
