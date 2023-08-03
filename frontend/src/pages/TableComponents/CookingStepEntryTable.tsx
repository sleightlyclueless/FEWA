import React, { useEffect, useState } from "react";
import { CookingStep } from "../../adapter/api/cookingStepEntry/CookingStep";
import { Table, Thead, Tbody, Tr, Th, Td } from "@chakra-ui/react";
import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import { IconButton } from "@chakra-ui/react";
import { getIngredient } from "../../adapter/api/ingredientEntry/ingredientEntries";
import { getRecipe } from "../../adapter/api/recipeEntry/recipeEntries";

type CookingStepEntryTableProps = {
  data: CookingStep[];
  onClickDeleteEntry: (cookingStepEntry: CookingStep) => void;
  onClickUpdateEntry: (cookingStepEntry: CookingStep) => void;
};

export const CookingStepEntryTable: React.FC<CookingStepEntryTableProps> = ({
  data,
  onClickDeleteEntry,
  onClickUpdateEntry,
}) => {
  const [ingredients, setIngredients] = useState<{ [key: number]: string }>({});
  const [recipes, setRecipes] = useState<{ [key: number]: string }>({});

  const [refresh, setRefresh] = useState(0);

  useEffect(() => {
    fetchIngredients();
    fetchRecipes();
  }, [refresh]);

  const fetchIngredients = async () => {
    const ingredientIds = data.map((entry) => entry.iId);
    for (const iId of ingredientIds) {
      const ingredient = await getIngredient(iId);
      if (ingredient) {
        setIngredients((prevState) => ({
          ...prevState,
          [iId]: ingredient.iName,
        }));
      }
    }
    setRefresh((prevRefresh) => prevRefresh + 1);
  };

  const fetchRecipes = async () => {
    const recipeIds = data.map((entry) => entry.rId);
    for (const rId of recipeIds) {
      const recipe = await getRecipe(rId);
      if (recipe) {
        setRecipes((prevState) => ({
          ...prevState,
          [rId]: recipe.rName,
        }));
      }
    }
    setRefresh((prevRefresh) => prevRefresh + 1);
  };

  return (
    <div style={{ overflowY: "auto" }}>
      <Table variant="striped" colorScheme="gray">
        <Thead>
          <Tr>
            <Th>ID</Th>
            <Th>Description</Th>
            <Th>Unit</Th>
            <Th>Amount</Th>
            <Th>Recipe</Th>
            <Th>Ingredient</Th>
            <Th>Actions</Th>
          </Tr>
        </Thead>
        <Tbody>
          {data.map((cookingStepEntry) => (
            <Tr key={cookingStepEntry.cId}>
              <Td>{cookingStepEntry.cId}</Td>
              <Td>{cookingStepEntry.description}</Td>
              <Td>{cookingStepEntry.unit}</Td>
              <Td>{cookingStepEntry.amount}</Td>
              <Td>{cookingStepEntry.rId} - {recipes[cookingStepEntry.rId]}</Td>
              <Td>{cookingStepEntry.cId} - {ingredients[cookingStepEntry.iId]}</Td>
              <Td>
                <IconButton
                  aria-label={"Delete Entry"}
                  icon={<DeleteIcon />}
                  onClick={() => onClickDeleteEntry(cookingStepEntry)}
                />
                <IconButton
                  aria-label={"Edit Entry"}
                  icon={<EditIcon />}
                  onClick={() => onClickUpdateEntry(cookingStepEntry)}
                />
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </div>
  );
};
