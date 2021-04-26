const mysql = require("mysql");
const inquirer = require("inquirer");

const dataConnection = mysql.createConnection ({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "DjwSMU23*!",
    database: "emptracker_db",
});

function startQuery() {
    inquirer
        .prompt ([
        {
            type: "list" ,
            name: "userRespsonse",
            message: "Select an Option Below:",
            choices: [
                "1. View Departments",
                "2. View Roles",
                "3. View Employees",
                "4. Add Departments",
                "5. Add roles",
                "6. Add Employees",
                "7. View Employees by Manager",
                "8. View Utilized Budget",
                "9. Update Employees",
                "10. Update Employee Managers",
                "11. Delete Departments",
                "12. Delete Roles",
                "13. Delete Employees",
                "Exit",
                ],
        }
    ])
        .then((response) => {
            switch (response.action) {
                case "1. View Departments":
                    viewDepartments();
                    break;
                case "2. View Roles":
                    viewRoles();
                    break;
                case "3. View Employees":
                    viewEmployees();
                    break;
                case "4. Add Departments":
                    addDepartments();
                    break;
                case "5. Add Roles":
                    addRoles();
                    break;
                case "6. Add Employees":
                    addEmployees();
                    break;
                case "7. View Employees by Manager":
                    viewEmpMan();
                    break;
                case "8. View Utilized Budget":
                    viewUtilBud();
                    break;
                case "9. Update Employees":
                    updateEmp();
                    break;
                case "10. Update Employee Managers":
                    updateEmpMan();
                    break;
                case "11. Delete Departments":
                    deleteDepartments();
                    break;
                case "12. Delete Roles":
                    deleteRoles();
                    break;
                case "13. Delete Employees":
                    deleteEmployees();
                    break;
                case "Exit":
                    console.log("Leaving Application");
                    process.exit(1);
;                   
                default:
                    console.log("A selection must be made or select Exit.");
                    dataConnection.end();
;                   

            }
        });
}

dataConnection.connect((err) => {
    if(err) throw err;
    console.log(`You are connected on id ${dataConnection.threadId}\n`);
    startQuery();
});
