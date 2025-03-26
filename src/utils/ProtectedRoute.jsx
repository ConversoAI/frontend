// src/utils/ProtectedRoute.jsx
import { Navigate } from 'react-router-dom';
import { isAuthenticated } from './authService';

export function ProtectedRoute({ children }) {
    if (!isAuthenticated()) {
        return <Navigate to="/login" replace />;
    }

    return children;
}