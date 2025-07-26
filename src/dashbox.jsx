import React, { useEffect, useState } from 'react';
import "./css/dashbox.css"

function Dashbox(){
    const [data, setData] = useState([]);

    useEffect(() => {
        fetch(`http://localhost:3000/status-counts?username=${localStorage.getItem("username")}`)
          .then((res) => res.json())
          .then((data) => setData(data))
          .catch((err) => console.error('Error fetching status data:', err));
      }, []);

      return (
            <div className="status-summary" style={{ marginTop: '20px' }}>
              <h1>Status Counts</h1>
              <div className="status-counts">
                <div className="status-item">
                  <span className="dot pending-dot"></span>
                  <strong>Pending:</strong> {data.find(d => d.name === 'pending')?.value || 0}
                </div>
                <div className="status-item">
                  <span className="dot progress-dot"></span>
                  <strong>In Progress:</strong> {data.find(d => d.name === 'in-progress')?.value || 0}
                </div>
                <div className="status-item">
                  <span className="dot completed-dot"></span>
                  <strong>Completed:</strong> {data.find(d => d.name === 'completed')?.value || 0}
                </div>
              </div>
            </div>

            )
}

export default Dashbox
