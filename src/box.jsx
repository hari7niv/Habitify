import "./css/box.css";
import React, { useState, useEffect } from 'react';

function Box({ _id, habit, description, priority, LastDate, status: initialStatus, onDelete }) {
  const [status, setStatus] = useState(initialStatus || "pending");

  useEffect(() => {
    const updateStatus = async () => {
      try {
        await fetch(`https://habitapp-kmf1.onrender.com/update-status/${_id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ status }),
        });
      } catch (error) {
        console.error("Failed to update status:", error);
      }
    };

    updateStatus();
  }, [status, _id]);

  const getPriorityClass = () => {
    switch (priority.toLowerCase()) {
      case 'high': return 'priority high';
      case 'medium': return 'priority medium';
      case 'low': return 'priority low';
      default: return 'priority';
    }
  };

  const getStatusStyle = () => {
    switch (status) {
      case "pending":
        return { backgroundColor: "#d0ebff", color: "#084298", border: "2px solid #084298" };
      case "in-progress":
        return { backgroundColor: "#fff3cd", color: "#9a7807ff", border: "2px solid #9a7807ff" };
      case "completed":
        return { backgroundColor: "#d4edda", color: "#08982aff", border: "2px solid #08982aff" };
      default:
        return {};
    }
  };

  return (
    <div className="box">
      <div className="box-content">
        <h2>{habit}</h2>
        <p><strong>Description: </strong>{description}</p>
        <p><strong>Deadline: </strong>{new Date(LastDate).toLocaleDateString()}</p>
        <p><strong>Priority: </strong><span className={getPriorityClass()}>{priority}</span></p>
      </div>

      <div className="box-actions">
        <div className="box-status">
          <select value={status} onChange={(e) => setStatus(e.target.value)} style={getStatusStyle()}>
            <option value="pending">Pending</option>
            <option value="in-progress">In Progress</option>
            <option value="completed">Completed</option>
          </select>
        </div>

        <div className="delete">
          <button className="delete-btn" onClick={onDelete}>Delete</button>
        </div>
      </div>
    </div>
  );
}

export default Box;
