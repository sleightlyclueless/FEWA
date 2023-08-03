import { Navigate, Route, RouteProps, Routes } from "react-router-dom";
import { LoginPage } from "./pages/LoginPage.tsx";
import { RegisterPage } from "./pages/RegisterPage.tsx";
import { OverviewPage } from "./pages/index.tsx";
import { RecipePage } from "./pages/RecipePage.tsx";
import { IngredientPage } from "./pages/IngredientPage.tsx";
import { CookingStepPage } from "./pages/CookingStepPage.tsx";
import { AuthRequired } from "./AuthRequired.tsx";

export type RouteConfig = RouteProps & {
  path: string;
  isPrivate?: boolean;
};

export const routes: RouteConfig[] = [
  {
    isPrivate: false,
    path: "/",
    element: <Navigate to="/overview" replace />,
  },
  {
    isPrivate: true,
    path: "/overview",
    element: <OverviewPage />,
  },
  {
    isPrivate: true,
    path: "/recipes",
    element: <RecipePage />,
  },
  {
    isPrivate: true,
    path: "/ingredients",
    element: <IngredientPage />,
  },
  {
    isPrivate: true,
    path: "/cookingsteps/:recipeId", // Use :recipeId as placeholder for the recipeId / specific querys for cookingsteps by recipeId
    element: <CookingStepPage />,
  },
  {
    path: "/auth/login",
    element: <LoginPage />,
  },
  {
    path: "/auth/register",
    element: <RegisterPage />,
  },
];

function renderRouteMap({ isPrivate, element, ...restRoute }: RouteConfig) {
  const authRequiredElement = isPrivate ? (
    <AuthRequired>{element}</AuthRequired>
  ) : (
    element
  );
  return (
    <Route key={restRoute.path} {...restRoute} element={authRequiredElement} />
  );
}

export const AppRoutes = () => {
  return <Routes>{routes.map(renderRouteMap)}</Routes>;
};
