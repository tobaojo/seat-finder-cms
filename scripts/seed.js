const fetch = (...args) =>
  import("node-fetch").then(({ default: fetch }) => fetch(...args));
const { table } = require("console");
const dotenv = require("dotenv");
const fs = require("fs");
dotenv.config();

const API_URL = "http://localhost:1337";

async function createUser(user) {
  try {
    const res = await fetch(`${API_URL}/api/users`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.FULL_ACCESS_KEY}`,
      },
      body: JSON.stringify({ data: user }),
    });
    if (!res.ok) {
      throw new Error(`Failed to create user: ${res.statusText}`);
    }
    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error creating user:", error);
  }
}

async function seedUsers() {
  const uploadsDir = "public/uploads";

  // Find the most recent JSON file in uploads
  const files = fs
    .readdirSync(uploadsDir)
    .filter((file) => file.endsWith(".json"))
    .map((file) => ({
      name: file,
      time: fs.statSync(`${uploadsDir}/${file}`).mtime.getTime(),
    }))
    .sort((a, b) => b.time - a.time);

  if (files.length === 0) {
    console.error("No JSON files found in uploads directory");
    return;
  }

  const latestFile = `${uploadsDir}/${files[0].name}`;
  console.log(`Reading from: ${latestFile}`);

  fs.readFile(latestFile, (err, data) => {
    if (err) throw err;
    const userData = JSON.parse(data);
    const mappedUsers = userData.map((user) => ({
      firstName: user["first name"],
      lastName: user["last name"],
      tableNumber: user["table"].toString(),
    }));
    Promise.all(mappedUsers.map(createUser))
      .then(() => console.log("All users have been created"))
      .catch((error) => console.error("Error seeding users:", error));
  });
}

seedUsers();
