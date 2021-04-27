const mysql = require("mysql");
const inquirer = require("inquirer");

const dataConnection = mysql.createConnection ({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "DjwSMU23*!",
    database: "emptracker_db",
});

//Selections for Views


const startQuery = () => {
    inquirer
        .prompt ([
        {
            type: "rawlist" ,
            name: "userResponse",
            message: "Select an Option Below:",
            choices: [
                "View Departments",
                "View Roles",
                "View Employees",
                "Add Departments",
                "Add roles",
                "Add Employees",
                "View Employees by Manager",
                "View Utilized Budget",
                "Update Employees",
                "Update Employee Managers",
                "Delete Departments",
                "Delete Roles",
                "Delete Employees",
                "Exit",
                ],
        }
    ])
        .then((response) => {
            switch (response.userResponse) {
                case "View Departments":
                    viewDepartments();
                    break;
                case "View Roles":
                    viewRoles();
                    break;
                case "View Employees":
                    viewEmployees();
                    break;
                case "Add Departments":
                    addDepartments();
                    break;
                case "Add Roles":
                    addRoles();
                    break;
                case "Add Employees":
                    addEmployees();
                    break;
                case "View Employees by Manager":
                    viewEmpMan();
                    break;
                case "View Utilized Budget":
                    viewUtilBud();
                    break;
                case "Update Employees":
                    updateEmp();
                    break;
                case "Update Employee Managers":
                    updateEmpMan();
                    break;
                case "Delete Departments":
                    deleteDepartments();
                    break;
                case "Delete Roles":
                    deleteRoles();
                    break;
                case "Delete Employees":
                    deleteEmployees();
                    break;
                case "Exit":
                    console.log("Leaving Application");
                    dataConnection.end();
                    process.exit(1);
                    break;                   
                default:
                    console.log("A selection must be made or select Exit.");
                    break;                   
            }
        });
};

const viewDepartments = () => {
    console.log("View of Departments...\n");
    dataConnection.query("SELECT * FROM department", (err, res) => {
        if(err) throw err;
        // console.log(res);
        console.log("................................");
        console.log("      List of Departments       ");
        console.log("................................");
        console.log("                                ");
        res.forEach(({ dname }) => {
        console.log(`${dname}`);
        });
        console.log("................................");
        console.log("                                ");
        startQuery();
    });
};

//Function to view employees
const viewEmployees = () => {
    console.log("View of Employees...\n");
    dataConnection.query("SELECT fname, lname FROM employee", (err, res) => {
        if(err) throw err;
        // console.log(res);
        console.log("................................");
        console.log("        List of Employees       ");
        console.log("................................");
        console.log("                                ");
        res.forEach(({ fname, lname }) => {
        console.log(`${fname} ${lname}`);
        });
        console.log("................................");
        console.log("                                ");
        startQuery();
    });
};

//Connection to the DB
dataConnection.connect((err) => {
    if(err) throw err;
    console.log(`You are connected on id ${dataConnection.threadId}\n`);
    startQuery();
});


