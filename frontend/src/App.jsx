import { Provider, useSelector } from "react-redux";
import store from "./store";
import Register from "./components/Register";
import Login from "./components/Login";
import KanbanBoard from "./components/KanbanBoard";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { selectIsAuthenticated } from "./slices/auth/authSlice";
import "./App.css";

const PrivateRoute = ({ children }) => {
  const isAuthenticated = useSelector(selectIsAuthenticated);
  return isAuthenticated ? children : <Navigate to="/login" />;
};

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route
            path="/register"
            element={
              <div className="container">
                <Register />
              </div>
            }
          />
          <Route
            path="/login"
            element={
              <div className="container">
                <Login />
              </div>
            }
          />

          <Route
            path="/task"
            element={
              <PrivateRoute>
                <KanbanBoard />
              </PrivateRoute>
            }
          />

          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;
