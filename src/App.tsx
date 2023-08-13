import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import "./index.css";
import CreateTaskPage from "./pages/CreateTaskPage";
import ListTasksPage from "./pages/ListTasksPage";
import BulkDeletePage from "./pages/BulkDeletePage";
import ProtectedRoute from "./HOC/ProtectedRoute";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";

const App: React.FC = () => {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route path="/login" component={LoginPage} />
          <Route path="/register" component={RegisterPage} />
          <ProtectedRoute path="/create-task" component={CreateTaskPage} />
          <ProtectedRoute path="/list-tasks" component={ListTasksPage} />
          <ProtectedRoute path="/bulk-delete" component={BulkDeletePage} />
          <Redirect from="/" to="/list-tasks" />
        </Switch>
      </div>
    </Router>
  );
};

export default App;
