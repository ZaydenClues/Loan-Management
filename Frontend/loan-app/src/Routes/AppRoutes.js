import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import LoginPage from "../components/Authentication/LoginPage";
import Dashboard from "../components/Dashboard/Dashboard";
import ApplyLoan from "../components/User/ApplyLoan";
import AdminDashboard from "../components/Admin/Dashboard/AdminDashboard";
import UserSignup from "../components/UserSignup/UserSignup";
import ProtectedRoute from "../components/ProtectedRoute";
import ProtectedAdminRoute from "../components/ProtectedAdminRoutes";
import ItemTable from "../components/Admin/ItemTable/ItemTable";
import ViewEmployeesData from "../components/Admin/CustomerData/ViewEmployeesData";
import LoanCardTable from "../components/Admin/LoanCard/LoanCardTable";
import ViewPurchased from "../components/ViewPurchased/ViewPurchased";
import ViewLoan from "../components/ViewLoan/ViewLoan";
import UserRegister from "../components/UserRegister/UserRegister";
import Page404 from "../components/404page/404page";

export function AppRoutes() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />

        <Route path="/" element={<LoginPage />} />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/applyloan"
          element={
            <ProtectedRoute>
              <ApplyLoan />
            </ProtectedRoute>
          }
        />

        <Route 
          path="/viewitems"
          element={
            <ProtectedRoute>
              <ViewPurchased />
            </ProtectedRoute>
          }
        />

        
        <Route 
          path="/viewloans"
          element={
            <ProtectedRoute>
              <ViewLoan />
            </ProtectedRoute>
          }
        />

        <Route
          path="/signup"
          element={
            //<ProtectedRoute>
            <UserSignup />
            //</ProtectedRoute>
          }
        />

        <Route
        path="/register"
        element={
          //<ProtectedRoute>
          <UserRegister />
          //</ProtectedRoute>
        }
      />

        <Route
          exact
          path="/admin/dashboard"
          element={
            <ProtectedAdminRoute>
              <AdminDashboard />
            </ProtectedAdminRoute>
          }
        />
        <Route
          exact
          path="admin/adduser"
          element={
            <ProtectedAdminRoute>
              <ViewEmployeesData />
            </ProtectedAdminRoute>
          }
        />

        <Route
          exact
          path="/admin/itemsMaster"
          element={
            <ProtectedAdminRoute>
              <ItemTable />
            </ProtectedAdminRoute>
          }
        />

<Route
          exact
          path="/admin/loanCard"
          element={
            <ProtectedAdminRoute>
              <LoanCardTable />
            </ProtectedAdminRoute>
          }
        />

        <Route path="/page404"
        element={
          <Page404 />
        }
        />

        <Route path="*" element={<Navigate to="/page404" />} />
      </Routes>
    </Router>
  );
}
