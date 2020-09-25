const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

const teamMember = [];
//build manager function
function managerRole() {
    inquirer
        .prompt([{
                type: "input",
                name: "managerName",
                message: "Who is the manager of this project?",
            },
            {
                type: "input",
                name: "managerID",
                message: "What is the manager id number?",
            },
            {
                type: "input",
                name: "managerEmail",
                message: "What is the manager's email?",
            },
            {
                type: "input",
                name: "managerOfficeNumber",
                message: "What is the manager's office number?",
            },
        ])
        .then((manager) => {
            manager = new Manager(
                manager.managerName,
                manager.managerID,
                manager.managerEmail,
                manager.managerOfficeNumber
            );
            teamMember.push(manager);
        })
    addAnotherEmployee();
}
//Engineer Role
function engineerRole() {
    inquirer
        .prompt([{
                type: "confirm",
                name: "engineerRole",
                message: "Do you wish to add an engineer to this team?",
            },
            {
                type: "input",
                name: "engineerName",
                message: "What is the engineer's name?",
            },
            {
                type: "input",
                name: "engineerID",
                message: "What is the engineer's ID number?",
            },
            {
                type: "input",
                name: "engineerEmail",
                message: "What is the engineer's email address?"
            },
            {
                type: "input",
                name: "engineerGitHub",
                message: "What is the engineer's Github link and/or username?"
            },
        ])
        .then((engineer) => {
            teamMember.push(
                new Engineer(
                    engineer.engineerName,
                    engineer.engineerEmail,
                    engineer.engineerID,
                    engineer.engineerGitHub,
                )
            )
        })
    addAnotherEmployee();
}

//intern function
function internRole() {
    inquirer
        .prompt([{
                type: "input",
                name: "internName",
                message: "What is the intern's name?",
            },
            {
                type: "input",
                name: "internID",
                message: "What is the intern's ID Number?",
            },
            {
                type: "input",
                name: "internEmail",
                message: "What is the intern's email?",
            },
            {
                type: "input",
                name: "internSchool",
                message: "What school does the intern attend?",
            }
        ])
        .then((intern) => {
            teamMember.push(
                new Intern(
                    intern.internName,
                    intern.InternID,
                    intern.internEmail,
                    intern.internSchool,
                )
            )
        })
    addAnotherEmployee();

}


// function to loop back around team members
function addAnotherEmployee() {
    inquirer
        .prompt([{
            type: "list",
            name: "nextTeamMember",
            message: "Do you want to add an engineer, intern, or complete your team?",
            choices: ["Engineer", "Intern", "End"]
        }, ])
        .then((list) => {
            if (list.choices = "Engineer") {
                engineerRole();
            }
            if (list.choices = "intern") {
                internRole();
            } else {
                console.log(teamMember);
                fs.existsSync(OUTPUT_DIR) || fs.mkdirSync(OUTPUT_DIR);
                fs.writeFileSync(outputPath, render(teamMember), "utf8");
            }
        })

}


// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.