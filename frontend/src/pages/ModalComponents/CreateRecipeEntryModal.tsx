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
import { Recipe } from "../../adapter/api/recipeEntry/Recipe";
import { createRecipe } from "../../adapter/api/recipeEntry/recipeEntries";

export type CreateRecipeEntryModalProps = {
  initialData?: Recipe;
  onSubmit: (data: Recipe) => void;
} & Omit<ModalProps, "children">;

export const CreateRecipeEntryModal: React.FC<CreateRecipeEntryModalProps> = ({
  initialData,
  onSubmit,
  ...restProps
}) => {
  const toast = useToast();

  const handleSubmit = async (values: Recipe, formikHelpers: any) => {
    try {
      const [response, success] = await createRecipe(values);
      if (success) {
        onSubmit(values);
        formikHelpers.setSubmitting(false);
        toast({
          title: "Recipe Entry Created",
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
        console.error("Failed to create recipe entry:", response);
      }
    } catch (error) {
      console.error("Failed to create recipe entry:", error);
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
      <Formik<Recipe>
        initialValues={initialData || { rName: "", rDescription: "", rImg: "" }}
        onSubmit={handleSubmit}
      >
        <Form>
          <ModalContent>
            <ModalHeader>
              {initialData ? "Edit Recipe Entry" : "Create New Recipe Entry"}
            </ModalHeader>
            <ModalCloseButton />
            <ModalBody as={VStack} spacing={4}>
              <InputControl name="rName" label="Name*" />
              <InputControl name="rDescription" label="Description*" />
              <InputControl name="rImg" label="Image URL" />
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
