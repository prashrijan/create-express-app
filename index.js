#!/usr/bin/env node

import fs from "fs";
import path from "path";
import inquirer from "inquirer";
import { execSync } from "child_process";

// Boilerplate content for server.js
const serverJsContent = `
import express from 'express';
const app = express();


app.get('/', (req, res) => {
    res.send('Hello, World!');
});

app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});
`;

// Boilerplate content for package.json
const packageJsonContent = (projectName) => `
{
    "name": "${projectName}",
    "version": "1.0.0",
    "main": "server.js",
    "scripts": {
        "dev": "nodemon server.js"
    },
    "dependencies": {
        "express": "^4.18.2"
    },
    "devDependencies": {
        "nodemon": "^2.0.22"
    }
}
`;

// Main function to generate files
const generateFiles = async () => {
  const answers = await inquirer.prompt([
    {
      type: "input",
      name: "projectName",
      message: "Enter the project name:",
      default: "my-express-app",
    },
  ]);

  const projectDir = process.cwd();

  if (!fs.existsSync(projectDir)) {
    fs.mkdirSync(projectDir);
  }

  //Create server.js
  fs.writeFileSync(path.join(projectDir, "server.js"), serverJsContent.trim());

  //   Create package.json
  fs.writeFileSync(
    path.join(projectDir, "package.json"),
    packageJsonContent(answers.projectName).trim()
  );

  console.log(`Files create successfully in ${projectDir}`);

  //   Install dependencies
  console.log("Installing dependencies....");

  try {
    execSync("npm install", { cwd: projectDir, stdio: "inherit" });
    console.log("Dependencies installed successfully.");
  } catch (error) {
    console.error("Failed to install dependencies:", error);
  }

  console.log(
    `Project setup complete. Navigate to ${answers.projectName} and start coding!`
  );
};

generateFiles();
