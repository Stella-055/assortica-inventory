// server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;


app.use(cors({
  origin: 'https://assortica.netlify.app', // Replace with your frontend's origin
  methods: 'GET,POST,PUT,DELETE',
  credentials: true, // If you need to send cookies or authorization headers
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const MONGODB_URI = process.env.MONGODB_URI;
// MongoDB connection
mongoose.connect( MONGODB_URI)
.then(() => {
  console.log('Connected to items MongoDB');
}).catch((err) => {
  console.error('Error connecting to MongoDB', err);
});


const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});
const itemSchema = new mongoose.Schema({
  jina: { type: String, required: true },
  total: { type: Number, required: true },
});
itemSchema.pre('save', function(next) {
  this.jina = this.jina.toLowerCase();
  next();
});
const User = mongoose.model('User', userSchema);

const Item = mongoose.model('Item', itemSchema);
app.post('/register', async (req, res) => {
 

  const { username, password } = req.body; // Use query parameters for demo purposes
  if (!username || !password) {
    return res.status(400).json({ message: 'Username and password are required' });
  } 
 try {
    
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({ username, password: hashedPassword });
    await newUser.save();

    res.status(201).json({ message: 'Password hashed and user saved successfully', user: newUser });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
    console.log(error)
  }
});

app.post('/', async (req, res) => {
  const { username, password } = req.body;
  
  try {
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(401).json({ message: 'Invalid username or password' });
    }

    const match = await bcrypt.compare(password, user.password);

    if (!match) {
      return res.status(401).json({ message: 'Invalid username or password' });
    }

    const token = jwt.sign({ id: user._id }, 'your_jwt_secret', { expiresIn: '1h' });
    res.json({ message: 'Login successful', token });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});
app.get('/home', async (req, res) => {
  const items = await Item.find();
  res.json(items);
});

// Add a new item
app.post('/add', async (req, res) => {
  try {
    let { jinas, total } = req.body;
     jinas = jinas.toLowerCase();
    const item = await Item.findOne({ jina:jinas });
    
    if(!item){
    const newItem = new Item({ jina:jinas, total });
    await newItem.save();
    res.json({ success: true, message: 'Item successfully created!' , item: newItem });
    }
    else{
      item.total += parseInt(total, 10);
      await item.save();
      res.json({ success: true, message: 'Item successfully updated!', item});
    }
    // Sending a success message along with the saved item
    
  } catch (error) {
    console.error('Error saving item:', error);
    res.status(500).json({ success: false, message: 'Failed to save item.' });
  }
});
app.delete('/home/:id', async (req, res) => {
  try {
    
      const { id } = req.params;
     
      const deletedItem = await Item.findByIdAndDelete(id);

      if (!deletedItem) {
          return res.status(404).json({ message: 'Item not found' });
      }

       res.json({ message: 'Item deleted' });
  } catch (error) {
      res.status(500).json({ message: 'Server error', error });
  }
});
// Delete an item
app.post('/remove', async (req, res) => {
  const { name1, quantity1 } = req.body;

  try {
    console.log(req.body.name1);
    const item = await Item.findOne({ jina:name1.toLowerCase() });

    if (!item) {
      return res.status(404).json({ message: 'Item not found' });
    }

    // Deduct quantity
    item.total -= parseInt(quantity1, 10);

    // Ensure quantity does not go below zero
    if (item.quantity < 0) {
      item.quantity = 0;
    }

    // Save the updated item
    await item.save();

    res.json({ message: 'Item updated successfully', item });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
