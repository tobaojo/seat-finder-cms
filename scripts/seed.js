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
  fs.readFile("scripts/csvjson1.json", (err, data) => {
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
