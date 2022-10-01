import { SyntheticEvent, useState } from "react";
import { Button, Card, Dropdown, Form, Icon, Input } from "semantic-ui-react";
import { fieldOptions } from "../../common/const";
import { FIELD } from "../../common/enum";
import { FieldType, CategoryDataType } from "../../common/types";
import { generateID } from "../../common/utils";
import "./AddCategory.scss";

type AddCategoryProps = {
  data: CategoryDataType;
  onSubmit: (data: CategoryDataType) => void;
  onRemove: (id: string) => void;
};
const AddCategory = ({ data, onSubmit, onRemove }: AddCategoryProps) => {
  const [formData, setFormData] = useState<CategoryDataType>(data);

  const handleNameChange = (value: string) => {
    const updateFormData = { ...formData };
    updateFormData.name = value;
    setFormData(updateFormData);
  };

  const handleAddField = (type: FIELD) => {
    const updateFormData = Object.assign({}, formData);
    const updatedFields = [...updateFormData.fields];
    updatedFields.push({ id: generateID(), type, value: "" });
    updateFormData.fields = updatedFields;
    setFormData(updateFormData);
  };

  const handleSaveData = () => {
    onSubmit(formData);
  };

  const getTitleFieldOptions = () => {
    return formData.fields
      .filter((data) => data.value.trim())
      .map(({ id, value }, key) => {
        return { key, text: value, value: id };
      });
  };

  const handleFieldLabelChange = (key: number, value: string) => {
    const updateFormData = Object.assign({}, formData);
    const updatedFields = [...updateFormData.fields];
    const fieldData = Object.assign({}, updatedFields[key]);
    fieldData.value = value;
    updatedFields[key] = { ...fieldData };
    updateFormData.fields = updatedFields;
    setFormData(updateFormData);
  };

  const handleFieldTypeChange = (key: number, value: any) => {
    const updateFormData = Object.assign({}, formData);
    const updatedFields = [...updateFormData.fields];

    if (value === FIELD.REMOVE) {
      updatedFields.splice(key, 1);
    } else {
      const fieldData = Object.assign({}, updatedFields[key]);
      fieldData.type = value;
      updatedFields[key] = { ...fieldData };
    }

    updateFormData.fields = updatedFields;
    setFormData(updateFormData);
  };

  const handleTitleFieldChange = (
    e: SyntheticEvent<HTMLElement>,
    data: any
  ) => {
    const updateFormData = Object.assign({}, formData);
    updateFormData.titleField = data.value;
    setFormData(updateFormData);
  };

  return (
    <Form>
      <Card fluid raised>
        <Card.Content>
          <Card.Header>
            {formData.name ? formData.name : "New Category"}
            <Icon
              name="trash"
              className="trash"
              onClick={() => onRemove(data.id)}
            />
          </Card.Header>
        </Card.Content>
        <Card.Content>
          <Form.Field>
            <label>Name</label>
            <Input
              value={formData.name}
              onChange={(e) => handleNameChange(e.target.value)}
            />
          </Form.Field>
          <Form.Field>
            <Form.Select
              fluid
              label="Title Field"
              options={getTitleFieldOptions()}
              value={formData.titleField}
              onChange={handleTitleFieldChange}
            />
          </Form.Field>
        </Card.Content>
        <Card.Content>
          {formData.fields &&
            formData.fields.length > 0 &&
            formData.fields.map((field: FieldType, key) => {
              const options = [...fieldOptions];
              if (formData.fields.length > 1) {
                options.push({
                  key: FIELD.REMOVE,
                  text: "Remove",
                  value: FIELD.REMOVE,
                });
              }
              return (
                <Input
                  className="input2"
                  key={key}
                  value={field.value}
                  onChange={(e) => handleFieldLabelChange(key, e.target.value)}
                  label={
                    <Dropdown
                      value={field.type}
                      options={options}
                      onChange={(_, { value }) =>
                        handleFieldTypeChange(key, value)
                      }
                    />
                  }
                  labelPosition="right"
                />
              );
            })}
        </Card.Content>
        <Card.Content>
          <Dropdown text="Add Field">
            <Dropdown.Menu>
              {fieldOptions.map(({ text, value }) => {
                return (
                  <Dropdown.Item
                    text={text}
                    onClick={() => handleAddField(value)}
                  />
                );
              })}
            </Dropdown.Menu>
          </Dropdown>
          <Button primary floated="right" onClick={handleSaveData}>
            Save
          </Button>
        </Card.Content>
      </Card>
    </Form>
  );
};

export default AddCategory;
