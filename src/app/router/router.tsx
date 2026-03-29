import { createHashRouter } from "react-router-dom";
import { EditUserPage } from "../../pages/EditUserPage/EditUserPage";
import { UsersPage } from "../../pages/UsersPage/UsersPage";

export const router = createHashRouter ([
  {
    path: "/",
    element: <UsersPage />,
  },
  {
    path: "/users/:id/edit",
    element: <EditUserPage />,
  },
]);