import React from "react";
import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  VStack,
  useToast,
} from "@chakra-ui/react";
import { Form, Formik } from "formik";
import { InputControl } from "formik-chakra-ui";
import { Recipe } from "../../adapter/api/recipeEntry/Recipe";
import { updateRecipe } from "../../adapter/api/recipeEntry/recipeEntries";

export type UpdateRecipeEntryModalProps = {
  initialData: Recipe;
  onSubmit: (data: Recipe) => void;
  onClose: () => void;
};

export const UpdateRecipeEntryModal: React.FC<UpdateRecipeEntryModalProps> = ({
  initialData,
  onSubmit,
  onClose,
}) => {
  const toast = useToast();

  const handleSubmit = async (values: Recipe, formikHelpers: any) => {
    try {
      const { rName, rDescription, rImg } = values;
      const updatedRecipe = { rName, rDescription, rImg };
      const [response, success] = await updateRecipe(
        initialData.rId,
        updatedRecipe
      );
      if (success) {
        onSubmit(values);
        formikHelpers.setSubmitting(false);
        toast({
          title: "Recipe Entry Updated",
          status: "success",
          duration: 2000,
          isClosable: true,
        });
        onClose();
      } else {
        toast({
          title: "Error",
          description: "Please check the log for more information:",
          status: "error",
          duration: 2000,
          isClosable: true,
        });
        console.error("Failed to update recipe entry:", response);
      }
    } catch (error) {
      console.error("Failed to update recipe entry:", error);
      toast({
        title: "Error",
        description: "Please check the log for more information:",
        status: "error",
        duration: 2000,
        isClosable: true,
      });
    }
  };

  return (
    <Modal isOpen={true} onClose={onClose}>
      <ModalOverlay />
      <Formik<Recipe> initialValues={initialData} onSubmit={handleSubmit}>
        <Form>
          <ModalContent>
            <ModalHeader>Edit Recipe</ModalHeader>
            <ModalCloseButton />
            <ModalBody as={VStack} spacing={4}>
              <InputControl name="rName" label="Name" />
              <InputControl name="rDescription" label="Description" />
              <InputControl name="rImg" label="Image URL" />
            </ModalBody>
            <ModalFooter>
              <Button variant="ghost" mr={3} onClick={onClose}>
                Close
              </Button>
              <Button colorScheme="blue" type="submit">
                Update
              </Button>
            </ModalFooter>
          </ModalContent>
        </Form>
      </Formik>
    </Modal>
  );
};
