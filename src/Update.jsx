import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const Update = () => {
  const [values, setValues] = useState({
    name: "",
    email: "",
    phone: ""
  });
  const [loading, setLoading] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:5000/users/${id}`)
      .then((res) => {
        setValues(res.data);
        setLoading(false);
      })
      .catch((err) => {
        toast.error("Error fetching user data!");
        console.error(err);
        setLoading(false);
      });
  }, [id]);

  const handleUpdate = async (event) => {
    event.preventDefault();
    setLoading(true);
    try {
      // Fetch all users to check for duplicate, excluding the current user
      const res = await axios.get("http://localhost:5000/users");
      const users = res.data;
      const duplicate = users.find(
        (user) =>
          Number(user.id) !== Number(id) &&
          (user.email === values.email ||
            user.name === values.name ||
            user.phone === values.phone)
      );
      if (duplicate) {
        toast.warning(
          "Another user with the same email, name, or phone already exists!"
        );
        setLoading(false);
        return;
      }
      // If no duplicate, update user
      await axios.put(`http://localhost:5000/users/${id}`, values);
      toast.success("User updated successfully!");
      setLoading(false);
      navigate("/");
    } catch (err) {
      toast.error("Error updating user!");
      console.error(err);
      setLoading(false);
    }
  };

  return (
    <div className="d-flex w-100 vh-100 justify-content-center align-items-center bg-light position-relative">
      {loading && (
        <div className="spinner-overlay">
          <div className="spinner"></div>
        </div>
      )}
      <div className="w-50 border bg-white shadow px-5 pt-3 pb-5 rounded">
        <h1 className="mb-4">Update User Data</h1>
        <form onSubmit={handleUpdate}>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">
              Name:
            </label>
            <input
              type="text"
              name="name"
              className="form-control"
              placeholder="Enter Name"
              value={values.name}
              onChange={(e) =>
                setValues({ ...values, name: e.target.value })
              }
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email:
            </label>
            <input
              type="email"
              name="email"
              className="form-control"
              placeholder="Enter Email"
              value={values.email}
              onChange={(e) =>
                setValues({ ...values, email: e.target.value })
              }
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="phone" className="form-label">
              Phone:
            </label>
            <input
              type="text"
              name="phone"
              className="form-control"
              placeholder="Enter Phone"
              value={values.phone}
              onChange={(e) =>
                setValues({ ...values, phone: e.target.value })
              }
              required
            />
          </div>
          <button type="submit" className="btn btn-success">
            Update
          </button>
          <Link to="/" className="btn btn-primary ms-3">
            Back
          </Link>
        </form>
      </div>
    </div>
  );
};

export default Update;
