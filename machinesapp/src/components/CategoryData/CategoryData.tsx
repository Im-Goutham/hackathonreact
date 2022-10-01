import { useDispatch } from "react-redux";
import { Button, Grid, Header } from "semantic-ui-react";
import { CategoryDataType, ItemDataType } from "../../common/types";
import { generateID } from "../../common/utils";
import AddItem from "../../components/AddItem";
import {
  addItem,
  getCategory,
  removeItem,
  saveItem,
} from "../../redux/slices/categorySlice";

function CategoryData({
  catId,
  category,
}: {
  catId: string;
  category: CategoryDataType | undefined;
}) {
  const dispatch = useDispatch();

  const handleAddItem = () => {
    const uniqId = generateID();
    dispatch(addItem({ catId, data: { id: uniqId } }));
    dispatch(getCategory(catId));
  };

  const handleSaveItem = (data: ItemDataType) => {
    dispatch(saveItem({ catId, data }));
    dispatch(getCategory(catId));
  };

  const handleRemoveItem = (itemId: string) => {
    dispatch(removeItem({ catId, itemId }));
    dispatch(getCategory(catId));
  };

  if (category) {
    return (
      <>
        <Header as="h2">{category.name}</Header>
        <Grid>
          {category.items && category.items.length> 0 && category.items.map((data) => {
            return (
              <Grid.Column mobile={16} tablet={8} computer={5} key={data.id}>
                <AddItem
                  key={data.id}
                  data={data}
                  onSubmit={handleSaveItem}
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

export default CategoryData;
