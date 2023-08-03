import React, { useEffect, useState } from "react";
import {
  Box,
  Heading,
  Button,
  IconButton,
  Flex,
  useToast,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  VStack,
  Input,
  Text
} from "@chakra-ui/react";
import { ArrowBackIcon, AddIcon, SearchIcon } from "@chakra-ui/icons";
import { RecipeEntryTable } from "./TableComponents/RecipeEntryTable";
import { Recipe } from "../adapter/api/recipeEntry/Recipe";
import {
  getAllRecipes,
  deleteRecipe,
  getRecipeByName,
  getRecipeByIngredient,
} from "../adapter/api/recipeEntry/recipeEntries";
import { CreateRecipeEntryModal } from "./ModalComponents/CreateRecipeEntryModal";
import { UpdateRecipeEntryModal } from "./ModalComponents/UpdateRecipeEntryModal";
import { useNavigate } from "react-router-dom";
import { AppLayout } from "../layout/AppLayout";

export const RecipePage: React.FC = () => {
  const [recipeEntries, setRecipeEntries] = useState<Recipe[]>([]);
  const [isCreateModalOpen, setCreateModalOpen] = useState(false);
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);
  const [nameSearchTerm, setNameSearchTerm] = useState("");
  const [ingredientSearchTerm, setIngredientSearchTerm] = useState("");
  const toast = useToast();
  const navigate = useNavigate();

  const handleSearch = async () => {
    try {
      let response;
      let searched = false;
      if (nameSearchTerm) {
        response = await getRecipeByName(nameSearchTerm);
        searched = true;
      } else if (ingredientSearchTerm) {
        response = await getRecipeByIngredient(ingredientSearchTerm);
        searched = true;
      } else {
        response = await getAllRecipes();
      }

      console.log(response);

      const [data, success] = response;
      if (success) {
        setRecipeEntries(data);
      } else {
        if (searched) {
          setRecipeEntries([]);
        } else {
          toast({
            title: "Error",
            description: "Please check the log for more information:",
            status: "error",
            duration: 2000,
            isClosable: true,
          });
          console.error("Failed to fetch recipe entries:", data);
        }
      }
    } catch (error: any) {
      console.error("Failed to fetch recipe entries:", error);
    }
  };

  const handleDeleteEntry = async (recipeEntry: Recipe) => {
    try {
      const [response, success] = await deleteRecipe(recipeEntry.rId);
      if (success) {
        toast({
          title: "Recipe Entry Deleted",
          status: "success",
          duration: 2000,
          isClosable: true,
        });
        handleSearch();
      } else {
        toast({
          title: "Error",
          description: "Please check the log for more information:",
          status: "error",
          duration: 2000,
          isClosable: true,
        });
        console.error("Failed to delete recipe entry:", response);
      }
    } catch (error) {
      console.error("Failed to delete recipe entry:", error);
    }
  };

  const handleCreateEntry = async () => {
    setCreateModalOpen(false);
    handleSearch();
  };

  const handleUpdateEntry = async (recipeEntry: Recipe) => {
    setSelectedRecipe(recipeEntry);
    setEditModalOpen(true);
    handleSearch();
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  useEffect(() => {
    handleSearch();
  }, []);

  return (
    <AppLayout>
      <Box p={4}>
        <Flex alignItems="center" mb={6}>
          <IconButton
            aria-label="Go Back"
            icon={<ArrowBackIcon />}
            onClick={handleGoBack}
            mr={2}
          />
          <Heading as="h1" size="xl" flexGrow={1}>
            Recipe Entries
          </Heading>
        </Flex>
        <Flex mb={4}>
          <Input
            placeholder="Search by name"
            value={nameSearchTerm}
            onChange={(e) => setNameSearchTerm(e.target.value)}
          />
          <Button
            leftIcon={<SearchIcon />}
            colorScheme="teal"
            variant="outline"
            ml={2}
            onClick={handleSearch}
          >
            Search
          </Button>
        </Flex>
        <Flex mb={4}>
          <Input
            placeholder="Search by ingredient"
            value={ingredientSearchTerm}
            onChange={(e) => setIngredientSearchTerm(e.target.value)}
          />
          <Button
            leftIcon={<SearchIcon />}
            colorScheme="teal"
            variant="outline"
            ml={2}
            onClick={handleSearch}
          >
            Search
          </Button>
        </Flex>
        <RecipeEntryTable
          data={recipeEntries}
          onClickDeleteEntry={handleDeleteEntry}
          onClickUpdateEntry={handleUpdateEntry}
        />
        <Button
          onClick={() => setCreateModalOpen(true)}
          leftIcon={<AddIcon />}
          colorScheme="teal"
          variant="outline"
          mt={4}
          w="100%"
        >
          Create New Entry
        </Button>
        <CreateRecipeEntryModal
          isOpen={isCreateModalOpen}
          onClose={() => {
            setCreateModalOpen(false);
            handleSearch();
          }}
          onSubmit={handleCreateEntry}
        />
        <Modal isOpen={isEditModalOpen} onClose={() => setEditModalOpen(false)}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Edit Recipe Entry</ModalHeader>
            <ModalCloseButton />
            <ModalBody as={VStack} spacing={4}>
              {selectedRecipe && (
                <UpdateRecipeEntryModal
                  initialData={selectedRecipe}
                  onSubmit={handleUpdateEntry}
                  onClose={() => {
                    setEditModalOpen(false);
                    handleSearch();
                  }}
                />
              )}
            </ModalBody>
          </ModalContent>
        </Modal>

        <Text mt={4} fontSize="sm" color="gray.500">
            * Should you not see realtime changes on the table, please refresh the page.
        </Text>
      </Box>
    </AppLayout>
  );
};

export default RecipePage;
