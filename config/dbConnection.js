const fs = require('fs').promises;
require('dotenv').config();
const mongoose = require('mongoose');

async function connectToDB(connectionString) {
  try {
    await mongoose.connect(connectionString);
    console.log("DB Connected...");
  } catch (err) {
    console.log(err);
  }
}

async function getConnectionString() {
  try {
    const data = await fs.readFile(process.env.CRED_FILE_PATH, 'utf8');
    console.log(data);
    await connectToDB(data);
  } catch (err) {
    console.error(err);
  }
}

getConnectionString();