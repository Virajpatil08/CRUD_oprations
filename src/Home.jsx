import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Home = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    axios
      .get("http://localhost:5000/users")
      .then((res) => {
        setData(res.data);
        setLoading(false);
      })
      .catch((err) => {
        toast.error("Failed to fetch users!");
        setLoading(false);
      });
  }, []);

  const handleDelete = (id) => {
    const confirm = window.confirm("Would you like to delete?");
    if (confirm) {
      setLoading(true);
      axios
        .delete("http://localhost:5000/users/" + id)
        .then((res) => {
          toast.success("User deleted successfully!");
          setData(data.filter((d) => d.id !== id));
          setLoading(false);
        })
        .catch((err) => {
          toast.error("Failed to delete user!");
          setLoading(false);
        });
    }
  };

  return (
    <div className="d-flex flex-column justify-content-center align-items-center bg-light vh-100 position-relative">
      {loading && (
        <div className="spinner-overlay">
          <div className="spinner"></div>
        </div>
      )}
      <h1 className="mb-4">List of Users</h1>
      <div className="w-75 rounded bg-white border shadow p-4">
        <div className="d-flex justify-content-end mb-3">
          <Link to="/create" className="btn btn-success">
            Add+
          </Link>
        </div>
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Id</th>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {data.map((d, i) => (
              <tr key={i}>
                <td>{d.id}</td>
                <td>{d.name}</td>
                <td>{d.email}</td>
                <td>{d.phone}</td>
                <td>
                  <Link to={`/read/${d.id}`} className="btn btn-sm btn-info me-2">
                    Read
                  </Link>
                  <Link to={`/update/${d.id}`} className="btn btn-sm btn-success me-2">
                    Edit
                  </Link>
                  <button
                    onClick={() => handleDelete(d.id)}
                    className="btn btn-sm btn-danger me-2"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Home;
