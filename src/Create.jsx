import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import Loader from "./Loader";

const Create = () => {
  const [values, setValues] = useState({ name: "", email: "", phone: "" });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await axios.get("http://localhost:5000/users");
      const users = res.data;
      const duplicate = users.find(
        (user) => user.email === values.email || user.phone === values.phone
      );

      if (duplicate) {
        toast.warning("User already exists with this Email or Phone!");
        setLoading(false);
        return;
      }

      await axios.post("http://localhost:5000/users", values);
      toast.success("User added successfully!");
      navigate("/");
    } catch (err) {
      toast.error("Error adding user!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100">
      {loading && <Loader />}
      <div className="bg-white shadow-lg p-8 rounded-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-gray-700 text-center mb-4">
          Add a User
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Name"
            className="input-field"
            value={values.name}
            onChange={(e) => setValues({ ...values, name: e.target.value })}
            required
          />
          <input
            type="email"
            placeholder="Email"
            className="input-field"
            value={values.email}
            onChange={(e) => setValues({ ...values, email: e.target.value })}
            required
          />
          <input
            type="tel"
            placeholder="Phone"
            className="input-field"
            value={values.phone}
            onChange={(e) => setValues({ ...values, phone: e.target.value })}
            required
          />
          <button
            type="submit"
            className="btn-primary w-full hover:bg-blue-700"
          >
            Add User
          </button>
        </form>
        <Link to="/" className="block text-center mt-4 text-blue-500">
          Back to Users
        </Link>
      </div>
    </div>
  );
};

export default Create;
