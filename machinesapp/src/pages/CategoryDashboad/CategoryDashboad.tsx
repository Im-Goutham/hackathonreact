import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Button, Grid, Header } from "semantic-ui-react";
import { CategoryState } from "../../common/types";
import { generateID } from "../../common/utils";
import AddItem from "../../components/AddItem";
import {
  addItem,
  getCategory,
  removeItem,
} from "../../redux/slices/categorySlice";

function CategoryDashboard() {
  let { id: catId } = useParams();
  const dispatch = useDispatch();
  const selectedCategory = useSelector(
    (state: CategoryState) => state.selectedCategory
  );

  useEffect(() => {
    dispatch(getCategory(catId));
  }, [catId]);

  const handleAddItem = () => {
    const uniqId = generateID();
    dispatch(addItem({ catId, data: { id: uniqId } }));
    dispatch(getCategory(catId));
  };

  const handleRemoveItem = (itemId: string) => {
    dispatch(removeItem({ catId, itemId }));
    dispatch(getCategory(catId));
  };

  if (selectedCategory) {
    return (
      <>
        <Header as="h2">{selectedCategory.name}</Header>
        <Grid>
          {selectedCategory.items.map((data) => {
            return (
              <Grid.Column mobile={16} tablet={8} computer={5} key={data.id}>
                <AddItem
                  data={data}
                  onSubmit={() => {}}
                  onRemove={handleRemoveItem}
                />
              </Grid.Column>
            );
          })}
          <Grid.Column mobile={16} tablet={8} computer={5}>
            <Button primary onClick={handleAddItem}>
              Add Item
            </Button>
          </Grid.Column>
        </Grid>
      </>
    );
  } else {
    return <>Not found ...</>;
  }
}

export default CategoryDashboard;
