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
import { Ingredient } from "../../adapter/api/ingredientEntry/Ingredient";
import { updateIngredient } from "../../adapter/api/ingredientEntry/ingredientEntries";

export type UpdateIngredientEntryModalProps = {
  initialData: Ingredient;
  onSubmit: (data: Ingredient) => void;
  onClose: () => void;
};

export const UpdateIngredientEntryModal: React.FC<
  UpdateIngredientEntryModalProps
> = ({ initialData, onSubmit, onClose }) => {
  const toast = useToast();

  const handleSubmit = async (values: Ingredient, formikHelpers: any) => {
    try {
      const { iName } = values;
      const updatedIngredient = { iName };
      const [response, success] = await updateIngredient(
        initialData.iId,
        updatedIngredient
      );
      if (success) {
        onSubmit(values);
        formikHelpers.setSubmitting(false);
        toast({
          title: "Ingredient Entry Updated",
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
        console.error("Failed to update ingredient entry:", response);
      }
    } catch (error) {
      console.error("Failed to update ingredient entry:", error);
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
      <Formik<Ingredient> initialValues={initialData} onSubmit={handleSubmit}>
        <Form>
          <ModalContent>
            <ModalHeader>Edit Ingredient</ModalHeader>
            <ModalCloseButton />
            <ModalBody as={VStack} spacing={4}>
              <InputControl name="iName" label="Name" />
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
