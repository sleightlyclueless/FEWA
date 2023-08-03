import React from "react";
import {
  Box,
  Heading,
  Button,
  Text,
  ListItem,
  OrderedList,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { AppLayout } from "../layout/AppLayout.tsx";

export const OverviewPage: React.FC = () => {
  return (
    <AppLayout>
      <Box textAlign="left" p={4}>
        <Heading as="h1" size="xl" mb={6}>
          Welcome to the Recipe App!
        </Heading>
        <Text fontSize="15px" margin="0 0 10px 0" color="cyan.700">
          To get started, please
        </Text>
        <OrderedList fontSize="15px" margin="0 0 25px 15px" color="cyan.700">
          <ListItem>
            Manage Ingredients: If you want to add a new recipe, create the
            ingredients you need in it, they are saved centrally for reusage in
            all recipes.
          </ListItem>
          <ListItem>
            Manage Recipes: Create or look at the recipe you want, the
            ingredients are linked within its Cooking Steps.
          </ListItem>
          <ListItem>
            Follow or create the Cooking Steps towards your delicious meal!
            Done!
          </ListItem>
        </OrderedList>
        <Button
          as={Link}
          to="/ingredients"
          size="lg"
          colorScheme="teal"
          variant="outline"
          mb={4}
          w="100%"
        >
          Manage Ingredients
        </Button>
        <Button
          as={Link}
          to="/recipes"
          size="lg"
          colorScheme="teal"
          variant="outline"
          mb={4}
          w="100%"
        >
          Manage Recipes
        </Button>
      </Box>
    </AppLayout>
  );
};
