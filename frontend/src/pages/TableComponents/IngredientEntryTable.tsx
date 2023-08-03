import React from "react";
import { Ingredient } from "../../adapter/api/ingredientEntry/Ingredient";
import { Table, Thead, Tbody, Tr, Th, Td } from "@chakra-ui/react";
import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import { IconButton } from "@chakra-ui/react";

type IngredientEntryTableProps = {
  data: Ingredient[];
  onClickDeleteEntry: (ingredientEntry: Ingredient) => void;
  onClickUpdateEntry: (ingredientEntry: Ingredient) => void;
};

export const IngredientEntryTable: React.FC<IngredientEntryTableProps> = ({
  data,
  onClickDeleteEntry,
  onClickUpdateEntry,
}) => {
  return (
    <Table variant="striped" colorScheme="gray">
      <Thead>
        <Tr>
          <Th>ID</Th>
          <Th>Name</Th>
          <Th>Actions</Th>
        </Tr>
      </Thead>
      <Tbody>
        {data.map((ingredientEntry) => (
          <Tr key={ingredientEntry.iId}>
            <Td>{ingredientEntry.iId}</Td>
            <Td>{ingredientEntry.iName}</Td>
            <Td>
              <IconButton
                aria-label={"Eintrag löschen"}
                icon={<DeleteIcon />}
                onClick={() => onClickDeleteEntry(ingredientEntry)}
              />
              <IconButton
                aria-label={"Eintrag bearbeiten"}
                icon={<EditIcon />}
                onClick={() => onClickUpdateEntry(ingredientEntry)}
              />
            </Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
  );
};
