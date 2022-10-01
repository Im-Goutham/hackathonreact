import { useDispatch, useSelector } from "react-redux";
import { Button, Container, Grid } from "semantic-ui-react";
import { CategoryDataType, CategoryState } from "./common/types";
import { generateID } from "./common/utils";
import { FIELD } from "./common/enum";
import {
  addCategory,
  removeCategory,
  saveCategory,
} from "./redux/slices/categorySlice";
import AddCategory from "./components/AddCategory";
import Header from "./components/Header";

import "./App.css";

function App() {
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
    <Container fluid>
      <Header />
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
    </Container>
  );
}

export default App;
