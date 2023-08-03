import React, { useEffect, useState } from "react";
import {
  Box,
  Heading,
  Button,
  Flex,
  useToast,
  IconButton,
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
import { CookingStepEntryTable } from "./TableComponents/CookingStepEntryTable";
import { CookingStep } from "../adapter/api/cookingStepEntry/CookingStep";
import {
  getAllCookingStepsByRecipe,
  deleteCookingStep,
} from "../adapter/api/cookingStepEntry/cookingStepEntries";
import { CreateCookingStepEntryModal } from "./ModalComponents/CreateCookingStepEntryModal";
import { UpdateCookingStepEntryModal } from "./ModalComponents/UpdateCookingStepEntryModal";
import { AppLayout } from "../layout/AppLayout";

export const CookingStepPage: React.FC = () => {
  const [cookingStepEntries, setCookingStepEntries] = useState<CookingStep[]>(
    []
  );
  const [isCreateModalOpen, setCreateModalOpen] = useState(false);
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [selectedCookingStep, setSelectedCookingStep] =
    useState<CookingStep | null>(null);
  const toast = useToast();

  const [refresh, setRefresh] = useState(0);

  useEffect(() => {
    fetchCookingStepEntries();
  }, [refresh]); // Add refresh as a dependency to trigger the effect when it changes to update page contents

  const fetchCookingStepEntries = async () => {
    try {
      // Get the recipe id from the URL path for specific query via backend API
      const rId = window.location.pathname.split("/").pop();

      const [response, success] = await getAllCookingStepsByRecipe(Number(rId));
      if (success) {
        setCookingStepEntries(response);
      } else {
        console.error("Failed to fetch cookingStep entries:", response);
      }
    } catch (error: any) {
      console.error("Failed to fetch cookingStep entries:", error);
    }
  };

  const handleDeleteEntry = async (cookingStepEntry: CookingStep) => {
    try {
      const [response, success] = await deleteCookingStep(cookingStepEntry.cId);
      if (success) {
        toast({
          title: "CookingStep Entry Deleted",
          status: "success",
          duration: 2000,
          isClosable: true,
        });
        fetchCookingStepEntries();
      } else {
        console.error("Failed to delete cookingStep entry:", response);
      }
      setRefresh((prevRefresh) => prevRefresh + 1);
    } catch (error) {
      console.error("Failed to delete cookingStep entry:", error);
    }
  };

  const handleCreateEntry = async () => {
    setCreateModalOpen(false);
    setRefresh((prevRefresh) => prevRefresh + 1);
  };

  const handleUpdateEntry = (cookingStepEntry: CookingStep) => {
    setSelectedCookingStep(cookingStepEntry);
    setEditModalOpen(true);
    setRefresh((prevRefresh) => prevRefresh + 1);
  };

  return (
    <AppLayout>
      <Box p={4}>
        <Flex alignItems="center" mb={6}>
          <IconButton
            aria-label="Go Back"
            icon={<ArrowBackIcon />}
            onClick={() => window.history.back()}
            mr={2}
          />
          <Heading as="h1" size="xl" flexGrow={1}>
            CookingStep Entries
          </Heading>
        </Flex>
        <CookingStepEntryTable
          data={cookingStepEntries}
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
        <CreateCookingStepEntryModal
          isOpen={isCreateModalOpen}
          onClose={() => {
            setCreateModalOpen(false);
            fetchCookingStepEntries();
          }}
          onSubmit={handleCreateEntry}
        />
        <Modal isOpen={isEditModalOpen} onClose={() => setEditModalOpen(false)}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Edit CookingStep Entry</ModalHeader>
            <ModalCloseButton />
            <ModalBody as={VStack} spacing={4}>
              {selectedCookingStep && (
                <UpdateCookingStepEntryModal
                  initialData={selectedCookingStep}
                  onSubmit={handleUpdateEntry}
                  onClose={() => {
                    setEditModalOpen(false);
                    fetchCookingStepEntries(); // Refresh the cookingStep entries
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

export default CookingStepPage;
