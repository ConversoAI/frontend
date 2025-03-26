// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Landing Pages
import Home from "./pages/landing/Home";
import Contact from "./pages/landing/Contact";
import Login from "./pages/landing/Login";
import ForgotPassword from "./pages/landing/ForgotPassword";
import NotFound from "./pages/landing/NotFound";
import Terms from "./pages/landing/Terms";
import Privacy from "./pages/landing/Privacy";
import ApiDebug from "./pages/ApiDebug";

// Dashboard Pages
import Dashboard from "./pages/dashboard/Dashboard";
import Chatbots from "./pages/dashboard/Chatbots";
import Settings from "./pages/dashboard/Settings";
import Support from "./pages/dashboard/Support";

// Layouts
import DashboardLayout from "./layouts/DashboardLayout";

// Context
import { AuthProvider } from "./context/AuthContext";

// Utils
import { ProtectedRoute } from "./utils/ProtectedRoute";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Landing Pages */}
          <Route path="/" element={<Home />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/test" element={<ApiDebug />} />

          {/* Dashboard Pages */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <DashboardLayout>
                  <Dashboard />
                </DashboardLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard/chatbots"
            element={
              <ProtectedRoute>
                <DashboardLayout>
                  <Chatbots />
                </DashboardLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard/settings"
            element={
              <ProtectedRoute>
                <DashboardLayout>
                  <Settings />
                </DashboardLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard/support"
            element={
              <ProtectedRoute>
                <DashboardLayout>
                  <Support />
                </DashboardLayout>
              </ProtectedRoute>
            }
          />

          {/* Not Found */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
