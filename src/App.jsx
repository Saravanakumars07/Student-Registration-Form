import { useState } from "react";
import "./App.css";

function App() {
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    college: "",
    email: "",
    password: "",
    address: "",
  });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const validateField = (field, value) => {
    if (field === "name" && !value.trim()) return "Name is required";
    if (field === "college" && !value.trim()) return "College is required";
    if (field === "address" && !value.trim()) return "Address is required";
    if (field === "username" && value && value !== value.toLowerCase())
      return "Username must be lowercase only";
    if (field === "email" && value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value))
      return "Enter a valid email address";
    if (field === "email" && !value.trim())
      return "Enter a valid email address";
    if (field === "password" && value.length < 8)
      return "Password must be at least 8 characters";
    return "";
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    const next = { ...formData, [name]: value };
    setFormData(next);
    setSubmitted(false);
    // Clear error live when field becomes valid
    if (errors[name]) {
      const msg = validateField(name, value);
      setErrors((prev) => ({ ...prev, [name]: msg }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};
    Object.keys(formData).forEach((key) => {
      const msg = validateField(key, formData[key]);
      if (msg) newErrors[key] = msg;
    });
    setErrors(newErrors);
    if (Object.keys(newErrors).length === 0) {
      setSubmitted(true);
    } else {
      setSubmitted(false);
    }
  };

  const field = (label, name, type = "text", placeholder) => (
    <div className="field">
      <label htmlFor={name}>{label}</label>
      <input
        id={name}
        name={name}
        type={type}
        value={formData[name]}
        onChange={handleChange}
        placeholder={placeholder}
      />
      {errors[name] && <p className="error">{errors[name]}</p>}
    </div>
  );

  return (
    <div className="page">
      <div className="card">
        <h1>Student Registration Form</h1>
        <p className="subtitle">Fill in the details to register</p>

        <form onSubmit={handleSubmit} noValidate>
          {field("Name", "name", "text", "Enter your name")}
          {field("Username", "username", "text", "Enter your username")}
          {field("College", "college", "text", "Enter your college")}
          {field("Email", "email", "text", "Enter your email")}
          {field("Password", "password", "password", "Enter your password")}
          {field("Address", "address", "text", "Enter your address")}

          <button type="submit">Register</button>
          {submitted && <p className="success">Registration successful!</p>}
          {submitted && <p>Form submitted successfully</p>}
        </form>
      </div>
    </div>
  );
}

export default App;