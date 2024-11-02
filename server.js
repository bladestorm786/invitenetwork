// Main Code Setup
const express = require('express');
const { Client, Account, Databases } = require('appwrite');
const dotenv = require('dotenv');
dotenv.config();

const app = express();
app.use(express.json());

// Initialize Appwrite.io Client
const client = new Client();
client
  .setEndpoint(process.env.APPWRITE_ENDPOINT) // Appwrite.io endpoint (e.g., "https://cloud.appwrite.io/v1")
  .setProject(process.env.APPWRITE_PROJECT_ID); // Appwrite Project ID

const account = new Account(client);
const database = new Databases(client, process.env.APPWRITE_DATABASE_ID);

// Appwrite-based Authentication and Database Logic follows...

// REST API Routes using Appwrite SDK
// Other logic remains the same

// Start Express Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
