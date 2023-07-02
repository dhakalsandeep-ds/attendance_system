// import reactLogo from "./assets/react.svg";
// import viteLogo from "/vite.svg";
// import "./App.css";
import { Route, Routes } from "react-router-dom";
import HideRoute from "./components/HideRoute";
import ProtectedRoute from "./components/ProtectedRoute";
import { AuthProvider } from "./context/auth";
import AdminLogin from "./pages/admin/AdminLogin";
import AdminLayout from "./pages/admin/AdminLayout";
import BatchView from "./pages/admin/BatchView";
import TeacherView from "./pages/admin/TeacherView";
import StudentView from "./pages/admin/StudentView";
import AttendanceView from "./pages/admin/AttendanceView";
import AddTeacherAndAdmin from "./pages/admin/AddTeacherAndAdmin";
import { OwnIDInit } from "@ownid/react";
import RegisterComponent from "./pages/admin/RegisterAdmin";
import AdminList from "./pages/admin/AdminList";

function App() {
  return (
    <AuthProvider>
      <div className="App">
        <OwnIDInit config={{ appId: "6kb4iorm9vgl8f" }} />
      </div>
      <Routes>
        <Route
          path="/"
          element={<RegisterComponent></RegisterComponent>}
        ></Route>
        <Route path="/admin">
          <Route
            index
            element={
              <HideRoute>
                <AdminLogin></AdminLogin>
              </HideRoute>
            }
          ></Route>

          <Route element={<ProtectedRoute></ProtectedRoute>}>
            <Route element={<AdminLayout></AdminLayout>}>
              <Route path="list" element={<AdminList></AdminList>}></Route>
              <Route
                path="batch/:batchId"
                element={<AddTeacherAndAdmin></AddTeacherAndAdmin>}
              ></Route>
              <Route path="batch" element={<BatchView></BatchView>}></Route>
              <Route
                path="teacher"
                element={<TeacherView></TeacherView>}
              ></Route>
              <Route
                path="student"
                element={<StudentView></StudentView>}
              ></Route>
              <Route
                path="attendance"
                element={<AttendanceView></AttendanceView>}
              ></Route>
            </Route>
          </Route>
        </Route>
      </Routes>
    </AuthProvider>
  );
}

export default App;
