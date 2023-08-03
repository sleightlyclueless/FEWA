import React from "react";
import { Recipe } from "../../adapter/api/recipeEntry/Recipe";
import {
  IconButton,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { DeleteIcon, EditIcon, InfoIcon } from "@chakra-ui/icons";
import { Link } from "react-router-dom";

export const RecipeEntryTable: React.FC<{
  data: Recipe[];
  onClickDeleteEntry: (recipeEntry: Recipe) => void;
  onClickUpdateEntry: (recipeEntry: Recipe) => void;
}> = ({ data, onClickDeleteEntry, onClickUpdateEntry }) => {
  if (!Array.isArray(data) || data.length === 0) {
    return <p>No recipes found.</p>;
  }
  return (
    <TableContainer>
      <Table variant="striped" colorScheme="gray">
        <Thead>
          <Tr>
            <Th>rId</Th>
            <Th>rName</Th>
            <Th>rDescription</Th>
            <Th>rImg</Th>
            <Th>rCreatedAt</Th>
            <Th>rUpdatedAt</Th>
            <Th>Actions</Th>
          </Tr>
        </Thead>
        <Tbody>
          {data.map((entry) => (
            <Tr key={entry.rId}>
              <Td>{entry.rId}</Td>
              <Td>{entry.rName}</Td>
              <Td>{entry.rDescription}</Td>
              <Td>{entry.rImg}</Td>
              <Td>{entry.rCreatedAt}</Td>
              <Td>{entry.rUpdatedAt}</Td>
              <Td>
                <IconButton
                  aria-label="Delete Entry"
                  icon={<DeleteIcon />}
                  onClick={() => onClickDeleteEntry(entry)}
                />
                <IconButton
                  aria-label="Edit Entry"
                  icon={<EditIcon />}
                  onClick={() => onClickUpdateEntry(entry)}
                />
                <IconButton
                  as={Link}
                  to={`/cookingsteps/${entry.rId}`}
                  aria-label="Further Information"
                  icon={<InfoIcon />}
                />
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
};
