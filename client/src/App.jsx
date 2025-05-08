import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext"; 
import AddNewInventory from "./pages/AddNewInventory.jsx";
// import AddNewInventory from "./pages/AddInventory.jsx";
import RestockInventory from "./pages/RestockInventory.jsx";
import InventoryTable from "./pages/InventoryTable";
import ChangeInventory from "./pages/ChangeInventory";
import IssueInventory from "./pages/IssueInventory";
import IssueInventoryTable from "./pages/IssueInventoryTable.jsx";
import ReturnInventory from "./pages/FacultyReturnInventory.jsx";
import FacultyRequestInventory from "./pages/FacultyRequestInventory.jsx";
import RequestInventoryTable from "./pages/RequestInventoryTable.jsx";
import FacultyReturnInventory from "./pages/FacultyReturnInventory.jsx";
import Report from "./pages/Report";
import Summary from "./pages/Summary";
import ThreShold from "./pages/Threshold";
import Login from "./pages/Login";
import First from "./pages/First";
import ProtectedRoute from "./components/ProtectedRouter";
import SignUp from "./pages/SignUp.jsx";
import Notify from "./pages/Notify.jsx";
import PurchaseTable from "./pages/PurchaseTable.jsx";
import FacultyRequestInventoryTable from "./pages/FacultyRequestInventoryTable.jsx";
import FacultyIssueInventoryTable from "./pages/FacultyIssueInventoryTable.jsx";
import FacultyViewRequestTable from "./pages/FacultyViewRequestTable.jsx";
import FacultyNotification from "./pages/FacultyNotification.jsx";
import PurchaseInventoryTable from "./pages/PurchaseInventoryTable .jsx";
import AdminRequestTable from "./pages/AdminRequestTable.jsx";
import AdminNotifications from "./pages/AdminNotifications.jsx";
import FacultyInventoryTable from "./pages/FacultyInventoryTable.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <First />,
    children: [
      { path: "/login", element: <Login /> },
      { path: "/signUp", element: <SignUp /> },
    // {
    //     path: "/inventory",
    //     element: (
    //       <ProtectedRoute allowedRoles={["admin","storeman"]}>
    //         <AddNewInventory />
    //       </ProtectedRoute>
    //     ),
    //   },
    {
      path: "/purchase",
      element: (
        <ProtectedRoute allowedRoles={["admin","storeman"]}>
          <AddNewInventory />
        </ProtectedRoute>
      ),
    },
      {
        path: "/restock-inventory",
        element: (
          <ProtectedRoute allowedRoles={["admin", "storeman"]}>
            <RestockInventory />
          </ProtectedRoute>
        ),
      },

      {
        path: "/inventory-table",
        element: (
          <ProtectedRoute allowedRoles={["admin", "storeman","faculty","accountant"]}>
            <InventoryTable />
          </ProtectedRoute>
        ),
      },
      {
        path: "/issue-inventory-table",
        element: (
          <ProtectedRoute allowedRoles={["admin", "storeman"]}>
            <IssueInventoryTable />
          </ProtectedRoute>
        ),
      },
      {
        path: "/request-inventory-table",
        element: (
          <ProtectedRoute allowedRoles={["admin", "storeman","faculty"]}>
            <RequestInventoryTable />
          </ProtectedRoute>
        ),
      },
      {
        path: "/change-inventory",
        element: (
          <ProtectedRoute allowedRoles={["admin", "storeman"]}>
            <ChangeInventory />
          </ProtectedRoute>
        ),
      },
      {
        path: "/issue-inventory",
        element: (
          <ProtectedRoute allowedRoles={["admin","storeman"]}>
            <IssueInventory />
          </ProtectedRoute>
        ),
      },
      {
        path: "/return-inventory",
        element: (
          <ProtectedRoute allowedRoles={["admin","faculty"]}>
            <ReturnInventory />
          </ProtectedRoute>
        ),
      },
      {
        path: "/purchase-table",
        element: (
          <ProtectedRoute allowedRoles={["admin","storeman"]}>
            <PurchaseTable />
          </ProtectedRoute>
        ),
      },
      {
        path: "/purchase-inventory-table",
        element: (
          <ProtectedRoute allowedRoles={["admin","storeman"]}>
            <PurchaseInventoryTable />
          </ProtectedRoute>
        ),
      },

      {
        path: "/faculty-issue-inventory-table",
        element: (
          <ProtectedRoute allowedRoles={["admin","faculty"]}>
            <FacultyIssueInventoryTable />
        </ProtectedRoute>
        ),
      },

      {
        path: "/faculty-view-request-table",
        element: (
          <ProtectedRoute allowedRoles={["admin","faculty"]}>
            <FacultyViewRequestTable />
        </ProtectedRoute>
        ),
      },

      {
        path: "/faculty-request-inventory",
        element: (
          <ProtectedRoute allowedRoles={["admin","faculty"]}>
            <FacultyRequestInventory />
        </ProtectedRoute>
        ),
      },
      {
        path: "/faculty-notification",
        element: (
          <ProtectedRoute allowedRoles={["admin","faculty"]}>
            <FacultyNotification/>
        </ProtectedRoute>
        ),
      },

      {
        path: "/faculty-return-inventory",
        element: (
          <ProtectedRoute allowedRoles={["admin","faculty"]}>
          <FacultyReturnInventory />
        </ProtectedRoute>
        ),
      },

      {
          path: "/notify",
          element: (
            <ProtectedRoute allowedRoles={["admin","faculty"]}>
              <Notify />
            </ProtectedRoute>
          ),
         },
         {
          path: "/faculty-request-inventory-table",
          element: (
            <ProtectedRoute allowedRoles={["admin","faculty"]}>
              <FacultyRequestInventoryTable />
            </ProtectedRoute>
          ),
         },


         {
          path: "/admin-request-table",
          element: (
            <ProtectedRoute allowedRoles={["admin"]}>
              <AdminRequestTable />
            </ProtectedRoute>
          ),
        },


        {
          path: "/admin-notifications",
          element: (
            <ProtectedRoute allowedRoles={["admin"]}>
              <AdminNotifications />
            </ProtectedRoute>
          ),
        },

      {
        path: "/report",
        element: (
          <ProtectedRoute allowedRoles={["admin","storeman","accountant"]}>
            <Report />
          </ProtectedRoute>
        ),
      },
      {
        path: "/summary",
        element: (
          <ProtectedRoute allowedRoles={["admin","storeman","accountant"]}>
            <Summary />
          </ProtectedRoute>
        ),
      },
      {
        path: "/threshold",
        element: (
          <ProtectedRoute allowedRoles={["admin","storeman"]}>
            <ThreShold />
          </ProtectedRoute>
        ),
      },
      {
        path: "/faculty-inventory-table",
        element: (
          <ProtectedRoute allowedRoles={["admin","faculty"]}>
            <FacultyInventoryTable />
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