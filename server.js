
const express = require('express');
const { Client, Account, Databases } = require('appwrite');
const dotenv = require('dotenv');
dotenv.config();

const app = express();
app.use(express.json());
app.use(express.static('public')); // Serves frontend files

// Initialize Appwrite client
const client = new Client();
client
  .setEndpoint(process.env.APPWRITE_ENDPOINT) // Appwrite API endpoint
  .setProject(process.env.APPWRITE_PROJECT_ID); // Appwrite Project ID

const account = new Account(client);
const database = new Databases(client, process.env.APPWRITE_DATABASE_ID);

// Root route
app.get('/', (req, res) => {
  res.send('Welcome to InviteNetwork!');
});

// Authentication route (for login)
app.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const session = await account.createEmailSession(email, password);
    res.status(200).json(session);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Post creation route
app.post('/posts', async (req, res) => {
  try {
    const { userId, content } = req.body;
    const response = await database.createDocument(
      'posts_collection', // Replace with your actual collection ID
      {
        userId,
        content,
        createdAt: new Date().toISOString(),
      }
    );
    res.status(201).json(response);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get all posts route
app.get('/posts', async (req, res) => {
  try {
    const posts = await database.listDocuments('posts_collection'); // Replace with your collection ID
    res.status(200).json(posts.documents);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
