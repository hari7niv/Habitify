import "./css/good.css";
import Box from "./box";
import { useEffect, useState } from "react";

function Good() {
  const [habits, setHabits] = useState([]);
  const [counts, setCounts] = useState({}); // habitId -> current count

  const username = localStorage.getItem("username");

useEffect(() => {
  fetch(`http://localhost:3000/get-list?username=${username}`)
    .then((res) => res.json())
    .then((data) => {
      setHabits(data);
      const initialCounts = {};
      data.forEach((habit) => {
        initialCounts[habit._id] = 0;
      });
      setCounts(initialCounts);
    })
    .catch((err) => console.error(err));
}, []);

  const handleDelete = async (id) => {
    const confirmed = window.confirm("Are you sure you want to delete this habit?");
    if (!confirmed) return;

    try {
      const username = localStorage.getItem("username");
const res = await fetch(`http://localhost:3000/delete-list/${id}?username=${username}`, {
  method: "DELETE",
});


      if (res.ok) {
        setHabits(habits.filter(habit => habit._id !== id));
        alert("Deleted successfully!");
      } else {
        const err = await res.json();
        alert("Failed to delete: " + err.message);
      }
    } catch (e) {
      alert("Error deleting habit: " + e.message);
    }
  };

  return (
    <div className="good">
  <h1>Habits</h1>
  <hr />
  <div className="box-container">
    {habits.map((habit) => (
      <Box
        key={habit._id}
        _id={habit._id}  
        habit={habit.habit}
        description = {habit.description}
        priority = {habit.priority}
        LastDate = {habit.LastDate}
        status={habit.status}  
        onDelete={() => handleDelete(habit._id)}
      />
    ))}
  </div>
</div>

  );
}

export default Good;
