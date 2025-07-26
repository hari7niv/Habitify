import React, { useEffect, useState } from 'react';
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer,Cell
} from 'recharts';
import './css/dashbord.css';
import Dashbox from './dashbox';

function Dashboard() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch(`https://habitapp-kmf1.onrender.com/priority-counts?username=${localStorage.getItem("username")}`)
      .then((res) => res.json())
      .then((data) => setData(data))
      .catch((err) => console.error('Error fetching priority data:', err));
  }, []);

  return (
    <div className="dashboard">
      <h1 className='title'>Dashboard</h1>
        <Dashbox></Dashbox>
        <div className='bar-chart'>
          <h1>Priority Bar</h1>
          <ResponsiveContainer width="98%" height="89%">
        <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis allowDecimals={false} />
        <Tooltip />
        <Bar dataKey="value">
          {data.map((entry, index) => {
            // Define color based on priority name
            let color = '#8884d8'; // default
            if (entry.name === 'high') color = '#FF7E6D';    // red
            else if (entry.name === 'medium') color = '#74B9FF'; // yellow
            else if (entry.name === 'low') color = '#A29BFE';    // green
            return <Cell key={`cell-${index}`} fill={color} />;
          })}
        </Bar>
      </BarChart>
    </ResponsiveContainer>

    </div>
    </div>
  );
}

export default Dashboard;
