import { useState } from "react";
// import reactLogo from "./assets/react.svg";
// import viteLogo from "/vite.svg";
// import "./App.css";
import AdminLogin from "./pages/AdminLogin";
import { Routes, Route } from "react-router-dom";
import BatchView from "./pages/BatchView";
import ProtectedRoute from "./components/ProtectedRoute";
import HideRoute from "./components/HideRoute";
import AttendanceView from "./pages/AttendanceView";
import StudentView from "./pages/StudentView";
import TeacherView from "./pages/TeacherView";
import AdminView from "./pages/AdminView";
import AdminLayout from "./pages/AdminLayout";
import { AuthContext, AuthProvider } from "./context/auth";

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route
          path="/"
          element={
            <HideRoute>
              <AdminLogin></AdminLogin>
            </HideRoute>
          }
        ></Route>
        <Route
          path="/batch"
          element={
            <ProtectedRoute>
              <AdminLayout>
                <BatchView></BatchView>
              </AdminLayout>
            </ProtectedRoute>
          }
        ></Route>
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <AdminLayout>
                <AdminView></AdminView>
              </AdminLayout>
            </ProtectedRoute>
          }
        ></Route>
        <Route
          path="/teacher"
          element={
            <ProtectedRoute>
              <AdminLayout>
                <TeacherView></TeacherView>
              </AdminLayout>
            </ProtectedRoute>
          }
        ></Route>
        <Route
          path="/student"
          element={
            <ProtectedRoute>
              <AdminLayout>
                <StudentView></StudentView>
              </AdminLayout>
            </ProtectedRoute>
          }
        ></Route>
        <Route
          path="/attendance"
          element={
            <ProtectedRoute>
              <AdminLayout>
                <AttendanceView></AttendanceView>
              </AdminLayout>
            </ProtectedRoute>
          }
        ></Route>
      </Routes>
    </AuthProvider>
  );
}

export default App;
