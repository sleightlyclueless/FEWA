import React, { useEffect, useState } from "react";
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
  Select,
} from "@chakra-ui/react";
import { Form, Formik } from "formik";
import { InputControl } from "formik-chakra-ui";
import { Ingredient } from "../../adapter/api/ingredientEntry/Ingredient";
import { getAllIngredients } from "../../adapter/api/ingredientEntry/ingredientEntries";
import { useLocation } from "react-router-dom";
import { updateCookingStep } from "../../adapter/api/cookingStepEntry/cookingStepEntries";

export type UpdateCookingStepEntryModalProps = {
  initialData: any;
  onSubmit: (data: any) => void;
  onClose: () => void;
};

export const UpdateCookingStepEntryModal: React.FC<
  UpdateCookingStepEntryModalProps
> = ({ initialData, onSubmit, onClose }) => {
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
      const [response, success] = await updateCookingStep(
        initialData.cId,
        updatedValues
      );
      if (success) {
        onSubmit(updatedValues);
        toast({
          title: "CookingStep Entry Updated",
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
    <Modal isOpen={true} onClose={onClose}>
      <ModalOverlay />
      <Formik
        initialValues={{
          description: initialData.description,
          unit: initialData.unit,
          amount: String(initialData.amount),
          iId: String(initialData.iId),
        }}
        onSubmit={handleSubmit}
      >
        {({ values, handleChange }) => (
          <Form>
            <ModalContent>
              <ModalHeader>Edit CookingStep Entry</ModalHeader>
              <ModalCloseButton />
              <ModalBody as={VStack} spacing={4}>
                <InputControl name="description" label="Description">
                  <input
                    name="description"
                    type="text"
                    value={values.description}
                    onChange={handleChange}
                  />
                </InputControl>
                <InputControl name="unit" label="Unit">
                  <input
                    name="unit"
                    type="text"
                    value={values.unit}
                    onChange={handleChange}
                  />
                </InputControl>
                <InputControl name="amount" label="Amount">
                  <input
                    name="amount"
                    type="text"
                    value={values.amount}
                    onChange={handleChange}
                  />
                </InputControl>
                <Select
                  name="iId"
                  placeholder="Select Ingredient"
                  value={values.iId}
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
                <Button colorScheme="blue" mr={3} type="submit">
                  Update
                </Button>
                <Button onClick={onClose}>Cancel</Button>
              </ModalFooter>
            </ModalContent>
          </Form>
        )}
      </Formik>
    </Modal>
  );
};
