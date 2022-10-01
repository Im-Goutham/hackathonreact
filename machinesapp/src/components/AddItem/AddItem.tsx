import { useState } from "react";
import { Button, Card, Checkbox, Form, Icon, Input } from "semantic-ui-react";
import { FIELD } from "../../common/enum";
import { ItemDataType, ItemFieldType } from "../../common/types";

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

  const returnField = ({ type, label }: ItemFieldType) => {
    if (type === FIELD.TEXT) {
      return (
        <>
          <label>{label}</label>
          <Input value={""} onChange={() => {}} />
        </>
      );
    } else if (type === FIELD.NUMBER) {
      return (
        <>
          <label>{label}</label>
          <Input type="number" value={""} onChange={() => {}} />
        </>
      );
    } else if (type === FIELD.DATE) {
      return (
        <>
          <label>{label}</label>
          <Input type="date" value={""} onChange={() => {}} />
        </>
      );
    } else if (type === FIELD.CHECKBOX) {
      return <Checkbox label={label} />;
    }
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
          {data.fields &&
            data.fields.length > 0 &&
            data.fields.map((field) => {
              return <Form.Field>{returnField(field)}</Form.Field>;
            })}
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
