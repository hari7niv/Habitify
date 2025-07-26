import "./css/addForm.css";
import { useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function AddForm() {


  const [formData, setFormData] = useState({
    habit: "",
    description: "",
    priority: "low",
    LastDate: null
  });

  const submitData = {
  ...formData,
  LastDate: formData.LastDate ? formData.LastDate : null
};

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  const username = localStorage.getItem("username");

  if (!username) {
    alert("User not logged in!");
    return;
  }

  const submitData = {
    ...formData,
    username, // include username with the habit
    LastDate: formData.LastDate || null
  };

  try {
    const res = await fetch("http://localhost:3000/add-list", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(submitData)
    });

    if (res.ok) {
      alert("Habit Added Successfully");
      setFormData({
        habit: "",
        description: "",
        priority: "low",
        LastDate: ""
      });
    } else {
      const errorData = await res.json();
      alert("Failed to add habit: " + errorData.message);
    }
  } catch (e) {
    alert("Error: " + e.message);
  }
};


  return (
    <div className="form">
      <form onSubmit={handleSubmit}>
        <h1>Add Habit</h1>

        <label htmlFor="habit">Habit:</label>
        <input
          type="text"
          name="habit"
          id="habit"
          value={formData.habit}
          onChange={handleChange}
          required
        />

        <label htmlFor="description">Description:</label>
        <textarea
          name="description"
          id="description"
          value={formData.description}
          onChange={handleChange}
        />

        <label htmlFor="priority">Priority:</label>
        <select
          name="priority"
          id="priority"
          value={formData.priority}
          onChange={handleChange}
        >
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>

        <label htmlFor="LastDate">Deadline:</label>
        <input
          type="date"
          name="LastDate"
          id="LastDate"
          value={formData.LastDate}
          onChange={handleChange}
        />

        <input type="submit" value="+ Add Habit" />
      </form>
    </div>
  );
}

export default AddForm;
