const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

//team member blank array to push employees onto
const teamMembers = [];


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
            teamMembers.push(manager);
            teamMemberGenerator();
        })
}


//Team Member Generator 
function teamMemberGenerator() {
    inquirer
        .prompt([{
                type: "list",
                name: "employeeType",
                message: "Do you want to add an engineer, intern, or complete your team?",
                choices: ["Engineer", "Intern"]
            },
            //Name,ID,Email same for both team members
            {
                type: "input",
                name: "memberName",
                message: "What is the team member's name?",
            },
            {
                type: "input",
                name: "memberID",
                message: "What is the team member's ID number?",
            },
            {
                type: "input",
                name: "memberEmail",
                message: "What is the team member's email address?"
            },
            //When engineer selected
            {
                type: "input",
                name: "engineerGitHub",
                message: "What is the engineer's Github link and/or username?",
                when: (userInput) => userInput.employeeType === "Engineer",
            },
            //when intern selected
            {
                type: "input",
                name: "internSchool",
                message: "What school does the intern attend?",
                when: (userInput) => userInput.employeeType === "Intern",
            }
        ])

    .then((teamMember) => {
        if (teamMember.employeeType === "Engineer") {
            teamMembers.push(
                new Engineer(
                    teamMember.memberName,
                    teamMember.memberEmail,
                    teamMember.memberID,
                    teamMember.engineerGitHub,
                )
            );
        } else {
            teamMembers.push(
                new Intern(
                    teamMember.memberName,
                    teamMember.memberID,
                    teamMember.memberEmail,
                    teamMember.internSchool
                )
            );
        }
        //function to loop background after inital team member is added
        addTeamMember();

    });
}

// function to loop back around team members
function addTeamMember() {
    inquirer
        .prompt([{
            type: "confirm",
            name: "newTeamMember",
            message: "Do you wish to add another team member(y or n)?",
        }, ])
        .then((confirm) => {
            if (confirm.newTeamMember) {
                teamMemberGenerator();
            } else {
                console.log(teamMembers)
                fs.existsSync(OUTPUT_DIR) || fs.mkdirSync(OUTPUT_DIR);
                fs.writeFileSync(outputPath, render(teamMembers), "utf8")
            }
        })
}
managerRole();