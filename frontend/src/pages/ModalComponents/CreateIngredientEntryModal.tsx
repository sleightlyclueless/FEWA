import React from "react";
import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalProps,
  ModalOverlay,
  VStack,
  useToast,
} from "@chakra-ui/react";
import { Form, Formik } from "formik";
import { InputControl } from "formik-chakra-ui";
import { Ingredient } from "../../adapter/api/ingredientEntry/Ingredient";
import { createIngredient } from "../../adapter/api/ingredientEntry/ingredientEntries";

export type CreateIngredientEntryModalProps = {
  initialData?: Ingredient;
  onSubmit: (data: Ingredient) => void;
} & Omit<ModalProps, "children">;

export const CreateIngredientEntryModal: React.FC<
  CreateIngredientEntryModalProps
> = ({ initialData, onSubmit, ...restProps }) => {
  const toast = useToast();

  const handleSubmit = async (values: Ingredient, formikHelpers: any) => {
    try {
      const [response, success] = await createIngredient(values);
      if (success) {
        onSubmit(values);
        formikHelpers.setSubmitting(false);
        toast({
          title: "Ingredient Entry Created",
          status: "success",
          duration: 2000,
          isClosable: true,
        });
      } else {
        toast({
          title: "Error",
          description: "Please check the log for more information:",
          status: "error",
          duration: 2000,
          isClosable: true,
        });
      }
    } catch (error) {
      console.error("Failed to create ingredient entry:", error);
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
    <Modal {...restProps}>
      <ModalOverlay />
      <Formik<Ingredient>
        initialValues={initialData || { iName: "" }}
        onSubmit={handleSubmit}
      >
        <Form>
          <ModalContent>
            <ModalHeader>
              {initialData
                ? "Edit Ingredient Entry"
                : "Create New Ingredient Entry"}
            </ModalHeader>
            <ModalCloseButton />
            <ModalBody as={VStack} spacing={4}>
              <InputControl name="iName" label="Name*" />
            </ModalBody>
            <ModalFooter>
              <Button variant="ghost" mr={3} onClick={restProps.onClose}>
                Close
              </Button>
              <Button colorScheme="blue" type="submit">
                {initialData ? "Update" : "Create"}
              </Button>
            </ModalFooter>
          </ModalContent>
        </Form>
      </Formik>
    </Modal>
  );
};
