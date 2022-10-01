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

  const handleInputChange = (key: number, value: string) => {
    const updateFormData = Object.assign({}, formData);
    const fields = [...updateFormData.fields];
    const fieldData = Object.assign({}, fields[key]);
    fieldData.value = value;
    fields[key] = fieldData;

    updateFormData.fields = [...fields];
    setFormData(updateFormData);
  };

  const returnField = ({ type, label, value }: ItemFieldType, key: number) => {
    if (type === FIELD.TEXT) {
      return (
        <>
          <label>{label}</label>
          <Input
            value={value}
            onChange={(e) => handleInputChange(key, e.target.value)}
          />
        </>
      );
    } else if (type === FIELD.NUMBER) {
      return (
        <>
          <label>{label}</label>
          <Input
            type="number"
            value={value}
            onChange={(e) => handleInputChange(key, e.target.value)}
          />
        </>
      );
    } else if (type === FIELD.DATE) {
      return (
        <>
          <label>{label}</label>
          <Input
            type="date"
            value={value}
            onChange={(e) => handleInputChange(key, e.target.value)}
          />
        </>
      );
    } else if (type === FIELD.CHECKBOX) {
      return (
        <Checkbox
          label={label}
          onChange={(e, data) => handleInputChange(key, data.vaue)}
        />
      );
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
          {formData.fields &&
            formData.fields.length > 0 &&
            formData.fields.map((field, key) => {
              return (
                <Form.Field key={key}>{returnField(field, key)}</Form.Field>
              );
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
