import React from "react";
import { Link } from "react-router-dom";

const HomePage: React.FC = () => {
  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <h2 className="card-title text-center mb-4">
                Welcome to Task Manager
              </h2>
              <p className="card-text text-center">
                Manage your tasks efficiently!
              </p>
              <div className="d-grid gap-2">
                <Link to="/list-tasks" className="btn btn-primary">
                  Go to List Tasks
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
