const mysql = require("mysql");
const inquirer = require("inquirer");

const dataConnection = mysql.createConnection ({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "DjwSMU23*!",
    database: "emptracker_db",
});

//Selections for Adds
const addOptions = {
    Add_Department: "ADD a DEPARTMENT to the database",
    Add_Employee: "ADD an EMPLOYEE to the database",
    Add_Role: "ADD a ROLE to the database",
    EXIT: "Exit"   
};

//These are the variables for the first options presented to the user
const mainOptions = {
    view_Database: "VIEW all Employees, VIEW by Department, VIEW by Role, or VIEW by Manager",
    add_Database: "ADD Employee, Department, or Role",
    update_Database: "UPDATE Employee Role or Employee Manager",
    delete_Database: "DELETE Employee, Role, or Department",
    EXIT: "Exit"
};

//This is the first screen with questions presented to the user
const mainStart = () => {
    inquirer.prompt ({
        type: "rawlist",
        name: "response",
        message: "How would you like to use the Employee Management System?",
        choices: [
            mainOptions.view_Database,
            mainOptions.add_Database,
            mainOptions.update_Database,
            mainOptions.delete_Database,
            mainOptions.EXIT,
        ],
    })
    .then((answer) => {
        switch(answer.response) {
            case mainOptions.view_Database:
                mainViewDatabase();
                break;
            case mainOptions.add_Database:
                mainAddDatabase();
                break; 
            case mainOptions.update_Database:
                mainUpdateDatabase();
                break; 
            case mainOptions.delete_Database:
                mainDeleteDatabase();
                break;
            case mainOptions.EXIT:
                process.exit(1);
                break;        
        }
    });
};

const mainViewDatabase = () => {
    inquirer.prompt ({
            type: "rawlist",
            name: "mainView",
            message: "What would you like to view?",
            choices: [
                "VIEW all Employees",
                "VIEW by Department",
                "VIEW by Role",
                "VIEW by Manager",
            ],
        })
        .then((answer) => {
            switch (answer.mainView) {
                case "VIEW all Employees":
                case "VIEW by Department":
                case "VIEW by Role":
                case "VIEW by Manager"  
            }
        })
}



const startQuery = () => {
    inquirer.prompt ({
        type: "rawlist",
        name: "action",
        message: `Select an option to add:`,
        choices: [
            addOptions.Add_Department,
            addOptions.Add_Employee,
            addOptions.Add_Role,
            addOptions.EXIT,
        ],

    })
    .then((answer) => {
        switch (answer.action) {
            case addOptions.Add_Department:
                addDepartment();
                break;
            case addOptions.Add_Employee:
                addEmployee();
                break;
            case addOptions.Add_Role:
                addRoles();
                break;
            case addOptions.EXIT:
                process.exit(1);
                //connection.end();
                break;
            default:
                console.log(`Select an action: ${answer.action}`);
                break;
        }
    });
};

const addEmployee = ()=> {
    inquirer.prompt ([
        {
            type: "input",
            name: "e_id",
            message: "Enter the id number for the new employee: " 
        },
        {
            type: "input",
            name: "fname",
            message: "Enter the first name of the new employee: "
        },
        {
            type: "input",
            name: "lname",
            message: "Enter the last name of the new employee: " 
        },
        {
            type: "input",
            name: "role_id",
            message: "Enter the role id for the new employee: " 
        },
        {
            type: "input",
            name: "manager_id",
            message: "Enter the manager id for the new employee: ",
            validate: function (input) {
                if(isNaN(input) === false) {
                  return true;
                } else if(isNaN(input) === true) {
                  console.log("A number needs to be entered");
                  return false; //make this into a function with a variable "needNumber"
                }
              }
          }   
    ]).then((answer) => {
        let values = {e_id: answer.e_id, fname: answer.fname, lname: answer.lname, role_id: answer.role_id, manager_id: answer.manager_id};
        dataConnection.query("INSERT INTO employee SET ?", values, (err, res) => {
          if(err) throw err;
          viewEmployees();
        });
       })
}

//         let e_id = answer.e_id;
//         let fname = answer.fname;
//         let lname = answer.lname;
//         let role_id = answer.role_id;
//         let manager_id = answer.manager_id;
//         dataConnection.query(`INSERT INTO employee (e_id, fname, lname, role_id, manager_id) VALUES (${e_id}, ${fname}, ${lname}, ${role_id},${manager_id})`,
//             [
//                 e_id, fname, lname, role_id, manager_id
//             ], (err) => {
//                 if(err) throw err;
//                 viewEmployees();
//             })
//     })
// }

/*************************************************************************** */

// const addEmployee = () => {
//     console.log(".....Adding an Employee.....\n");
//     dataConnection.query(
//         "INSERT INTO employee SET ?",
//         {
//             e_id: 445,
//             fname: "William",
//             lname: "Smith",
//             role_id: 200,
//             manager_id: 150,
//         },
//         (err, res) => {
//             if(err) throw err;
//             console.log(`${res.addedEmployee} Employee Added!\n`);
//             viewEmployee();
//         }
//     );
//     console.log(query.sql);
// };

// const startQuery = () => {
//     inquirer
//         .prompt ([
//         {
//             type: "rawlist" ,
//             name: "userResponse",
//             message: "Select an Option Below:",
//             choices: [
//                 "View Departments",
//                 "View Roles",
//                 "View Employees",
//                 "Add Departments",
//                 "Add roles",
//                 "Add Employees",
//                 "View Employees by Manager",
//                 "View Utilized Budget",
//                 "Update Employees",
//                 "Update Employee Managers",
//                 "Delete Departments",
//                 "Delete Roles",
//                 "Delete Employees",
//                 "Exit",
//                 ],
//         }
//     ])
//         .then((response) => {
//             switch (response.userResponse) {
//                 case "View Departments":
//                     viewDepartments();
//                     break;
//                 case "View Roles":
//                     viewRoles();
//                     break;
//                 case "View Employees":
//                     viewEmployees();
//                     break;
//                 case "Add Departments":
//                     addDepartments();
//                     break;
//                 case "Add Roles":
//                     addRoles();
//                     break;
//                 case "Add Employees":
//                     addEmployees();
//                     break;
//                 case "View Employees by Manager":
//                     viewEmpMan();
//                     break;
//                 case "View Utilized Budget":
//                     viewUtilBud();
//                     break;
//                 case "Update Employees":
//                     updateEmp();
//                     break;
//                 case "Update Employee Managers":
//                     updateEmpMan();
//                     break;
//                 case "Delete Departments":
//                     deleteDepartments();
//                     break;
//                 case "Delete Roles":
//                     deleteRoles();
//                     break;
//                 case "Delete Employees":
//                     deleteEmployees();
//                     break;
//                 case "Exit":
//                     console.log("Leaving Application");
//                     dataConnection.end();
//                     process.exit(1);
//                     break;                   
//                 default:
//                     console.log("A selection must be made or select Exit.");
//                     break;                   
//             }
//         });
// };

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
    //startQuery();
    mainStart();
});


