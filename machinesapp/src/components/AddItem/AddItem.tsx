import { useState } from "react";
import { Button, Card, Form, Icon, Input } from "semantic-ui-react";
import { ItemDataType } from "../../common/types";

type AddItemProps = {
  data: ItemDataType;
  onSubmit: (data: ItemDataType) => void;
  onRemove: (id: string) => void;
};
const AddItem = ({ data, onSubmit, onRemove }: AddItemProps) => {
  const [formData, setFormData] = useState<ItemDataType>(data);

  const handleSaveData = () => {
    onSubmit(formData);
  };

  return (
    <Form>
      <Card fluid raised>
        <Card.Content>
          <Card.Header>
            "New Item"
            <Icon
              name="trash"
              className="trash"
              onClick={() => onRemove(formData.id)}
            />
          </Card.Header>
        </Card.Content>
        <Card.Content>
          <Form.Field>
            <label>Name</label>
            <Input value={""} onChange={() => {}} />
          </Form.Field>
        </Card.Content>
        <Card.Content>
          <Button primary floated="right" onClick={handleSaveData}>
            Save
          </Button>
        </Card.Content>
      </Card>
    </Form>
  );
};

export default AddItem;
