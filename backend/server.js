const express = require('express');
const mongoose = require('mongoose');
const Product = require('./models/model');
const app = express();
const User = require('./models/user');
app.use(express.json());
const cors = require('cors');
app.use(cors());
mongoose.connect('mongodb://localhost:27017/HabitTracker').then(()=>{
    console.log("connected to database")
})
.catch((err)=>{
    console.log(err)
})
app.listen(3000, () => {
    console.log("Server is running on https://habitapp-kmf1.onrender.com");
});

app.get("/get-list", async (req, res) => {
  const { username } = req.query;
  if (!username) return res.status(400).json({ message: "Username is required" });

  try {
    const habits = await Product.find({ username });
    res.status(200).json(habits);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.post("/add-list", async (req, res) => {
  const { username, habit, description, priority, LastDate } = req.body;

  if (!username) return res.status(400).json({ message: "Username required" });

  try {
    const product = await Product.create({
      username,
      habit,
      description,
      priority,
      LastDate
    });

    res.status(200).json(product);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.delete("/delete-list/:id", async (req, res) => {
  const { username } = req.query;
  try {
    const habit = await Product.findOneAndDelete({ _id: req.params.id, username });
    if (!habit) {
      return res.status(404).json({ message: "Habit not found or unauthorized" });
    }
    res.status(200).json({ message: "Deleted Successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
app.get('/priority-counts', async (req, res) => {
  const { username } = req.query;
  if (!username) return res.status(400).json({ error: 'Username is required' });

  try {
    const rawCounts = await Product.aggregate([
      { $match: { username } }, 
      {
        $group: {
          _id: '$priority',
          count: { $sum: 1 }
        }
      }
    ]);

    const priorities = ['high', 'medium', 'low'];
    const formatted = priorities.map(priority => {
      const match = rawCounts.find(item => item._id === priority);
      return {
        name: priority,
        value: match ? match.count : 0
      };
    });

    res.json(formatted);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch priority counts' });
  }
});

app.put("/update-status/:id", async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  try {
    const updated = await Product.findByIdAndUpdate(id, { status }, { new: true });

    if (!updated) {
      return res.status(404).json({ message: "Habit not found" });
    }

    res.status(200).json(updated);
  } catch (error) {
    console.error("Error updating habit status:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});


app.get('/status-counts', async (req, res) => {
  const { username } = req.query;
  if (!username) return res.status(400).json({ error: 'Username is required' });

  try {
    const rawCounts = await Product.aggregate([
      { $match: { username } },
      {
        $group: {
          _id: '$status',
          count: { $sum: 1 }
        }
      }
    ]);

    const statuses = ['pending', 'in-progress', 'completed'];
    const formatted = statuses.map(status => {
      const match = rawCounts.find(item => item._id === status);
      return {
        name: status,
        value: match ? match.count : 0
      };
    });

    res.json(formatted);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch status counts' });
  }
});


app.delete("/delete-list/:id", async (req, res) => {
  const { id } = req.params;
  const { username } = req.query;

  try {
    const deleted = await product.findOneAndDelete({ _id: id, username });
    if (!deleted) {
      return res.status(404).json({ message: "Habit not found" });
    }

    res.status(200).json({ message: "Deleted successfully" });
  } catch (err) {
    console.error("Error deleting habit:", err);
    res.status(500).json({ message: "Internal server error" });
  }
});


app.post("/register",async(req,res)=>{
    try{
        const product = await User.create(req.body);
        res.status(200).json(product);
    }
    catch(err){
        res.status(500).json({message:err.message});
    }
})

app.post("/login", async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: "Username and password required" });
  }

  try {
    const user = await User.findOne({ username });

    if (!user || user.password !== password) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    res.status(200).json({ message: "Login successful", username: user.username });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
