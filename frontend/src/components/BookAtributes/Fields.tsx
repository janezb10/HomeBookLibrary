import { FormControl, FormLabel, Select } from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";

export interface AllFieldsInterface {
  id_field: number;
  field: string;
  id_subfield: number;
  subfield: string;
}

interface FieldInterface {
  id_field: number;
  field: string;
}

interface SubFieldInterface {
  id_subfield: number;
  subfield: string;
}
export interface SelectedFields {
  id_field: number;
  id_subfield: number;
}

interface Props {
  allFields: AllFieldsInterface[];
  onSelect: ({ id_field, id_subfield }: SelectedFields) => void;
  selectedFields?: SelectedFields;
}

const Fields = ({
  allFields,
  onSelect,
  selectedFields = { id_field: 0, id_subfield: 0 },
}: Props) => {
  const [fields, setFields] = useState<FieldInterface[]>([]);
  const [subfields, setSubfields] = useState<SubFieldInterface[]>([]);

  const [newField, setNewField] = useState<SelectedFields>(selectedFields);
  const subfieldRef = useRef<HTMLSelectElement | null>(null);

  useEffect(() => {
    const uniqueFieldsMap = new Map();
    allFields.forEach((field) => {
      if (!uniqueFieldsMap.has(field.id_field)) {
        uniqueFieldsMap.set(field.id_field, {
          id_field: field.id_field,
          field: field.field,
        });
      }
    });
    setFields(Array.from(uniqueFieldsMap.values()));
  }, []);

  useEffect(() => {
    const possibleSubfields: SubFieldInterface[] = [];
    allFields.forEach((subfield) => {
      if (subfield.id_field === newField.id_field) {
        possibleSubfields.push({
          id_subfield: subfield.id_subfield,
          subfield: subfield.subfield,
        });
      }
    });
    setSubfields(possibleSubfields);

    if (subfieldRef.current?.value)
      subfieldRef.current!.value = "Podpodročje...";
  }, [newField.id_field]);

  useEffect(() => {
    onSelect(newField);
  }, [newField]);

  return (
    <>
      <FormControl>
        <FormLabel>Področje:</FormLabel>
        <Select
          placeholder="Področje..."
          value={newField.id_field}
          onChange={(e) => {
            setNewField({ id_field: +e.target.value, id_subfield: 0 });
          }}
        >
          {fields.map((field) => {
            return (
              <option value={field.id_field} key={field.id_field}>
                {field.field}
              </option>
            );
          })}
        </Select>
      </FormControl>
      <FormControl>
        <FormLabel>Podpodročje:</FormLabel>
        <Select
          ref={subfieldRef}
          value={newField.id_subfield}
          placeholder="Podpodročje..."
          onChange={(e) => {
            setNewField({ ...newField, id_subfield: +e.target.value });
          }}
        >
          {subfields.map((subfield) => {
            return (
              <option value={subfield.id_subfield} key={subfield.id_subfield}>
                {subfield.subfield}
              </option>
            );
          })}
        </Select>
      </FormControl>
    </>
  );
};

export default Fields;
