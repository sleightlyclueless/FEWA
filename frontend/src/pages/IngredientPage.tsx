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
  Text,
} from "@chakra-ui/react";
import { ArrowBackIcon, AddIcon } from "@chakra-ui/icons";
import { IngredientEntryTable } from "./TableComponents/IngredientEntryTable";
import { Ingredient } from "../adapter/api/ingredientEntry/Ingredient";
import {
  getAllIngredients,
  deleteIngredient,
} from "../adapter/api/ingredientEntry/ingredientEntries";
import { CreateIngredientEntryModal } from "./ModalComponents/CreateIngredientEntryModal";
import { UpdateIngredientEntryModal } from "./ModalComponents/UpdateIngredientEntryModal";
import { useNavigate } from "react-router-dom";
import { AppLayout } from "../layout/AppLayout";

export const IngredientPage: React.FC = () => {
  const [ingredientEntries, setIngredientEntries] = useState<Ingredient[]>([]);
  const [isCreateModalOpen, setCreateModalOpen] = useState(false);
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [selectedIngredient, setSelectedIngredient] =
    useState<Ingredient | null>(null);
  const toast = useToast();
  const navigate = useNavigate();

  const [refresh, setRefresh] = useState(0);

  useEffect(() => {
    fetchIngredientEntries();
  }, [refresh]); // Add refresh as a dependency to trigger the effect when it changes

  const fetchIngredientEntries = async () => {
    try {
      const [response, success] = await getAllIngredients();
      if (success) {
        setIngredientEntries(response);
      } else {
        toast({
          title: "Error",
          description: "Please check the log for more information:",
          status: "error",
          duration: 2000,
          isClosable: true,
        });
        console.error("Failed to fetch ingredient entries:", response);
      }
    } catch (error: any) {
      console.error("Failed to fetch ingredient entries:", error);
    }
  };

  const handleDeleteEntry = async (ingredientEntry: Ingredient) => {
    try {
      const [response, success] = await deleteIngredient(ingredientEntry.iId);
      if (success) {
        toast({
          title: "Ingredient Entry Deleted",
          status: "success",
          duration: 2000,
          isClosable: true,
        });
        fetchIngredientEntries();
      } else {
        toast({
          title: "Error",
          description: "Please check the log for more information:",
          status: "error",
          duration: 2000,
          isClosable: true,
        });
        console.error("Failed to delete ingredient entry:", response);
      }
      setRefresh((prevRefresh) => prevRefresh + 1);
    } catch (error) {
      console.error("Failed to delete ingredient entry:", error);
    }
  };

  const handleCreateEntry = async () => {
    setCreateModalOpen(false);
    setRefresh((prevRefresh) => prevRefresh + 1);
  };

  const handleUpdateEntry = (ingredientEntry: Ingredient) => {
    setSelectedIngredient(ingredientEntry);
    setEditModalOpen(true);
    setRefresh((prevRefresh) => prevRefresh + 1);
  };

  const handleGoBack = () => {
    navigate(-1);
  };

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
            Ingredient Entries
          </Heading>
        </Flex>
        <IngredientEntryTable
          data={ingredientEntries}
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
        <CreateIngredientEntryModal
          isOpen={isCreateModalOpen}
          onClose={() => {
            setCreateModalOpen(false);
            fetchIngredientEntries();
          }}
          onSubmit={handleCreateEntry}
        />
        <Modal isOpen={isEditModalOpen} onClose={() => setEditModalOpen(false)}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Edit Ingredient Entry</ModalHeader>
            <ModalCloseButton />
            <ModalBody as={VStack} spacing={4}>
              {selectedIngredient && (
                <UpdateIngredientEntryModal
                  initialData={selectedIngredient}
                  onSubmit={handleUpdateEntry}
                  onClose={() => {
                    setEditModalOpen(false);
                    fetchIngredientEntries();
                  }}
                />
              )}
            </ModalBody>
          </ModalContent>
        </Modal>
        <Text mt={4} fontSize="sm" color="gray.500">
          * Should you not see realtime changes on the table, please refresh the
          page.
        </Text>
      </Box>
    </AppLayout>
  );
};

export default IngredientPage;
