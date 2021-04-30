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
                "EXIT",
            ],
        })
        .then((answer) => {
            switch (answer.mainView) {
                case "VIEW all Employees":
                    viewAllEmployees();
                    break;
                case "VIEW by Department":
                    viewDepartments();
                    break;
                case "VIEW by Role":
                    viewRoles();
                    break;
                case "VIEW by Manager":
                    viewMangers();
                    break;
                case "EXIT":
                    process.exit(1);
                                   
            }
        });
};


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
          viewAllEmployees();
        });
       })
}

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



//Function to view all employees
const viewAllEmployees = () => {
    console.log("View of Employees...\n");
    dataConnection.query(`
    SELECT employee.e_id, employee.fname, employee.lname, job.title, job.salary, 
    department.dname, CONCAT(m.fname, " ",m.lname) AS manager
    FROM employee 
    LEFT JOIN job ON employee.role_id = job.j_id
    LEFT JOIN department ON job.department_id = department.d_id
    LEFT JOIN employee m ON   m.e_id = employee.manager_id
    ORDER BY employee.e_id`, (err, res) => {
        if(err) throw err;
        console.table(res);
        console.log("...............................................");
        console.log("               List of Employees               ");
        console.log("...............................................");
        console.log("                                               ");
        res.forEach(({ e_id, fname, lname, title, salary, dname, manager }) => {
        console.log(`${e_id}:   | ${fname}       ${lname} | ${title}    | ${salary}   |  ${dname}    | ${manager}     `);
        });
        console.log("................................................");
        console.log("                                                ");
        mainViewDatabase();
    });
};

//Function to view employees by departments

const viewDepartments = () => {
    inquirer.prompt ({
        type: "input",
        name: "EmpDepartView",
        message: "Enter the department to view?",
    })
    .then((answer) => {
        const query = `
        SELECT department.dname as "department", employee.fname as "FirstName", employee.lname as "LastName", employee.e_id as "id"
        FROM employee
        LEFT JOIN job ON employee.role_id = job.j_id 
        LEFT JOIN department ON job.department_id = department.d_id
        WHERE (department.dname = ? )
        ORDER BY employee.e_id
        `;
        dataConnection.query(query, [answer.EmpDepartView], (err, res) => {
            if(err) throw err;
            console.table(res);
            res.forEach(({ department, FirstName, LastName, id }, i) => {
            const num = i + 1;   
            console.log(
                `${num} Department: ${department} || First Name: ${FirstName} || Last Name: ${LastName} || ID: ${id}`
              );
            });
            mainViewDatabase();
          });
        });
    }


// Function to view employees by role
const viewRoles = () => {
    inquirer.prompt ({
        type: "rawlist",
        name: "EmpRoleView",
        message: "Select ROLES below",
        choices: [
            "Sales Person",
            "Designer",
            "Artists",
            "Accountants",
            "Resource Manager",
            "Human Resource Specialist",
            "EXIT",
        ]
    })
    .then((answer) => {
        const query = `
        SELECT job.title as "title", employee.fname as "FirstName", employee.lname as "LastName", employee.e_id as "e_id"
        FROM job
        LEFT JOIN employee ON job.j_id = employee.role_id
        WHERE (job.title = ? )
        ORDER BY employee.e_id
        `;
        dataConnection.query(query, [answer.EmpRoleView], (err, res) => {
            if(err) throw err;
            console.table(res);
            res.forEach(({ title, FirstName, LastName, e_id }, i) => {
            const num = i + 1;
            console.log(`Title\t\t\tFirst Name\t\tLast Name\t\tID\t`)   
            console.log(
                `${num} Title: ${title} || First Name: ${FirstName} || Last Name: ${LastName} || ID: ${e_id}`
              );
            });
            mainViewDatabase();
          });
        });
    }

// Function to view managers
const viewMangers = () => {
    console.log("View of Managers...\n");
    dataConnection.query(`
    SELECT employee.fname AS "FirstName", employee.lname AS "LastName", job.title AS "Title"
    FROM employee
    INNER JOIN job ON  employee.role_id = job.j_id
    WHERE job.title LIKE "%$ Supervisor%" ESCAPE "$"
    ORDER BY job.title`, (err, res) => {
        if(err) throw err;
        console.table(res);
        console.log("...............................................");
        console.log("               List of Managers              ");
        console.log("...............................................");
        console.log("                                               ");
        res.forEach(({ FirstName, LastName, Title }) => {
        console.log(`${FirstName}:   | ${LastName}       ${Title}    `);
        });
        console.log("................................................");
        console.log("                                                ");
        mainViewDatabase();
    });
};



















const viewDepartmentsXX = () => {
    console.log("View of Employees by Departments...\n");
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
        mainViewDatabase();
    });
};



//Connection to the DB
dataConnection.connect((err) => {
    if(err) throw err;
    console.log(`You are connected on id ${dataConnection.threadId}\n`);
    //startQuery();
    mainStart();
});


