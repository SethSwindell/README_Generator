const fs = require("fs/promises");
const inquirer = require("inquirer");
const generateReadme = require("./utils/generateReadme");

async function promptUser() {
  const questions = [
    {
      type: "input",
      name: "projectTitle",
      message: "Project title?",
    },
    {
      type: "input",
      name: "description",
      message: "Type a brief description of your project: ",
    },
    {
      type: "input",
      name: "installation",
      message: "Describe the installation process: ",
    },
    {
      type: "input",
      name: "usage",
      message: "What is this project usage for?",
    },
    {
      type: "list",
      name: "license",
      message: "Chose the appropriate license for this project: ",
      choices: [
        "Apache",
        "Academic",
        "GNU",
        "ISC",
        "MIT",
        "Mozilla",
        "Open",
      ],
    },
    {
      type: "input",
      name: "contributing",
      message: "Who are the contributors of this projects?",
    },
    {
      type: "input",
      name: "tests",
      message: "Is there a test included?",
    },
    {
      type: "input",
      name: "questions",
      message: "What do I do if I have an issue? ",
    },
    {
      type: "input",
      name: "username",
      message: "Please enter your GitHub username: ",
    },
    {
      type: "input",
      name: "email",
      message: "Please enter your email: ",
    },
  ];

  const answers = await inquirer.prompt(questions);
  return answers;
}

async function init() {
  try {
    const answers = await promptUser();
    const generateContent = generateReadme(answers);
    await fs.writeFile("./dist/README.md", generateContent);
    console.log("✔️  Successfully wrote to README.md");
  } catch (err) {
    console.log(err);
  }
}

init();
