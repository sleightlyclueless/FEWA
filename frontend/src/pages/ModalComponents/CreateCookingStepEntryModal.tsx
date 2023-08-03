import React, { useEffect, useState } from "react";
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
  Select,
} from "@chakra-ui/react";
import { Form, Formik } from "formik";
import { InputControl } from "formik-chakra-ui";
import { Ingredient } from "../../adapter/api/ingredientEntry/Ingredient";
import { getAllIngredients } from "../../adapter/api/ingredientEntry/ingredientEntries";
import { useLocation } from "react-router-dom";
import { createCookingStep } from "../../adapter/api/cookingStepEntry/cookingStepEntries";

export type CreateCookingStepEntryModalProps = {
  onSubmit: (data: any) => void;
} & Omit<ModalProps, "children">;

export const CreateCookingStepEntryModal: React.FC<
  CreateCookingStepEntryModalProps
> = ({ onSubmit, ...restProps }) => {
  const toast = useToast();
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);
  const location = useLocation();
  const rId = location.pathname.split("/")[2];

  useEffect(() => {
    fetchIngredients();
  }, []);

  const fetchIngredients = async () => {
    try {
      const [ingredientsResponse] = await getAllIngredients();
      setIngredients(ingredientsResponse as Ingredient[]);
    } catch (error) {
      console.error("Failed to fetch ingredients:", error);
    }
  };

  const handleSubmit = async (values: any) => {
    try {
      const { description, unit, amount, iId } = values;
      const updatedValues = {
        description,
        unit,
        amount,
        rId: Number(rId),
        iId: Number(iId),
      };
      const [response, success] = await createCookingStep(updatedValues);
      if (success) {
        onSubmit(updatedValues);
        toast({
          title: "CookingStep Entry Created",
          status: "success",
          duration: 2000,
          isClosable: true,
        });
        restProps.onClose();
      } else {
        toast({
          title: "Error",
          description: "Please check the log for more information:",
          status: "error",
          duration: 2000,
          isClosable: true,
        });
        console.error("Failed to update cookingStep entry:", response);
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Please check the log for more information:",
        status: "error",
        duration: 2000,
        isClosable: true,
      });
      console.error("Failed to update cookingStep entry:", error);
    }
  };

  return (
    <Modal {...restProps}>
      <ModalOverlay />
      <Formik
        initialValues={{
          description: "",
          unit: "",
          amount: "",
          iId: "",
          rId: rId,
        }}
        onSubmit={handleSubmit}
      >
        {({ values, handleChange }) => (
          <Form>
            <ModalContent>
              <ModalHeader>Create New CookingStep Entry</ModalHeader>
              <ModalCloseButton />
              <ModalBody as={VStack} spacing={4}>
                <InputControl name="description" label="Description*">
                  <input
                    name="description"
                    type="text"
                    value={values.description}
                    onChange={handleChange}
                  />
                </InputControl>
                <InputControl name="unit" label="Unit*">
                  <input
                    name="unit"
                    type="text"
                    value={values.unit}
                    onChange={handleChange}
                  />
                </InputControl>
                <InputControl name="amount" label="Amount*">
                  <input
                    name="amount"
                    type="number"
                    value={values.amount}
                    onChange={handleChange}
                  />
                </InputControl>
                <Select
                  name="iId"
                  placeholder="Select Ingredient*"
                  onChange={handleChange}
                >
                  {ingredients.map((ingredient) => (
                    <option key={ingredient.iId} value={ingredient.iId}>
                      {ingredient.iName}
                    </option>
                  ))}
                </Select>
              </ModalBody>
              <ModalFooter>
                <Button variant="ghost" mr={3} onClick={restProps.onClose}>
                  Close
                </Button>
                <Button colorScheme="blue" type="submit">
                  Create
                </Button>
              </ModalFooter>
            </ModalContent>
          </Form>
        )}
      </Formik>
    </Modal>
  );
};
