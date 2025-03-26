import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext"; 
import AddInventory from "./pages/AddInventory.jsx";
import InventoryTable from "./pages/InventoryTable";
import ChangeInventory from "./pages/ChangeInventory";
import IssueInventory from "./pages/IssueInventory";
import ReturnInventory from "./pages/ReturnInventory";
import Report from "./pages/Report";
import Summary from "./pages/Summary";
import ThreShold from "./pages/Threshold";
import UserProfile from "./pages/UserProfile";
import Login from "./pages/Login";
import First from "./pages/First";
import ProtectedRoute from "./components/ProtectedRouter";



const router = createBrowserRouter([
  {
    path: "/",
    element: <First />,
    children: [
      { path: "/login", element: <Login /> },
      {
        path: "/add-inventory",
        element: (
          <ProtectedRoute>
            <AddInventory />
          </ProtectedRoute>
        ),
      },
      {
        path: "/inventory-table",
        element: (
          <ProtectedRoute>
            <InventoryTable />
          </ProtectedRoute>
        ),
      },
      {
        path: "/change-inventory",
        element: (
          <ProtectedRoute>
            <ChangeInventory />
          </ProtectedRoute>
        ),
      },
      {
        path: "/issue-inventory",
        element: (
          <ProtectedRoute>
            <IssueInventory />
          </ProtectedRoute>
        ),
      },
      {
        path: "/return-inventory",
        element: (
          <ProtectedRoute>
            <ReturnInventory />
          </ProtectedRoute>
        ),
      },
      {
        path: "/report",
        element: (
          <ProtectedRoute>
            <Report />
          </ProtectedRoute>
        ),
      },
      {
        path: "/summary",
        element: (
          <ProtectedRoute>
            <Summary />
          </ProtectedRoute>
        ),
      },
      {
        path: "/threshold",
        element: (
          <ProtectedRoute>
            <ThreShold />
          </ProtectedRoute>
        ),
      },
      {
        path: "/user_profile",
        element: (
          <ProtectedRoute>
            <UserProfile />
          </ProtectedRoute>
        ),
      },
    ],
  },
]);

function App() {
  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  );
}

export default App;