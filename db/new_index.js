const mysql = require("mysql");
const inquirer = require("inquirer");
const consTable = require("console.table");

const dataConnection = mysql.createConnection({
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
    view_Database: "VIEW all Employees, VIEW Departments, VIEW Roles, or VIEW Managers",
    add_Database: "ADD Employee, Department, or Role",
    update_Database: "UPDATE Employee Role or Employee Manager",
    delete_Database: "DELETE Employee, Role, or Department",
    EXIT: "Exit"
};

//This is the first screen with questions presented to the user
const mainStart = () => {
    inquirer.prompt({
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
            switch (answer.response) {
                case mainOptions.view_Database:
                    mainViewDatabase();
                    break;
                case mainOptions.add_Database:
                    mainAddDatabase();
                    break;
                case mainOptions.update_Database:
                    //updateEmployeeRole();
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

//Main prompts to start views
const mainViewDatabase = () => {
    inquirer.prompt({
        type: "rawlist",
        name: "mainView",
        message: "What would you like to VIEW?",
        choices: [
            "VIEW all Employees",
            "VIEW Departments",
            "VIEW Roles",
            "VIEW Managers",
            "Go Back to MAIN Menu",
            "EXIT",
        ],
    })
        .then((answer) => {
            switch (answer.mainView) {
                case "VIEW all Employees":
                    viewAllEmployees();
                    break;
                case "VIEW Departments":
                    viewDepartments();
                    break;
                case "VIEW Roles":
                    viewRoles();
                    break;
                case "VIEW Managers":
                    viewMangers();
                    break;
                case "Go Back to MAIN Menu":
                    mainStart();
                    break;
               case "EXIT":
                    process.exit(1);

            }
        });
};


//Main prompts to start adds
const mainAddDatabase = () => {
    inquirer.prompt({
        type: "rawlist",
        name: "mainAdd",
        message: "What would you like to ADD?",
        choices: [
            "ADD an Employee",
            "ADD a Department",
            "ADD a Role",
            "ADD a Manager",
            "Go Back to Veiw Menu",
            "EXIT",
        ],
    })
        .then((answer) => {
            switch (answer.mainAdd) {
                case "ADD an Employee":
                    addEmployee();
                    break;
                case "ADD a Department":
                    addDepartment();
                    break;
                case "ADD a Role":
                    addRole();
                    break;
                case "ADD a Manager":
                    addMangers();
                    break;
                case "Go Back to View Menu":
                    mainViewDatabase();
                    break;
                case "EXIT":
                    process.exit(1);

            }
        });
};

//Main prompts to start updates
const mainUpdateDatabase = () => {
    inquirer.prompt({
        type: "rawlist",
        name: "mainUpdate",
        message: "What would you like to update?",
        choices: [
            "UPDATE Employee Role",
            "UPDATE Employee Manager",
            "Go Back to Veiw Menu",
            "Go Back to MAIN Menu",
            "EXIT",
        ]
    })
        .then((answer) => {
            switch (answer.mainUpdate) {
                case "UPDATE Employee Role":
                    updateEmployeeRole();
                    break;
                case "UPDATE Employee Manager":
                    updateEmployeeManager();
                    break;
                case "Go Back to Veiw Menu":
                    mainViewDatabase();
                    break;
                case "Go Back to MAIN Menu":
                    mainStart();
                    break;


                case "EXIT":
                    process.exit(1);
            }
        });
};


















// const startQuery = () => {
//     inquirer.prompt ({
//         type: "rawlist",
//         name: "action",
//         message: `Select an option to add:`,
//         choices: [
//             addOptions.Add_Department,
//             addOptions.Add_Employee,
//             addOptions.Add_Role,
//             addOptions.EXIT,
//         ],

//     })
//     .then((answer) => {
//         switch (answer.action) {
//             case addOptions.Add_Department:
//                 addDepartment();
//                 break;
//             case addOptions.Add_Employee:
//                 addEmployee();
//                 break;
//             case addOptions.Add_Role:
//                 addRoles();
//                 break;
//             case addOptions.EXIT:
//                 process.exit(1);
//                 //connection.end();
//                 break;
//             default:
//                 console.log(`Select an action: ${answer.action}`);
//                 break;
//         }
//     });
// };


/*************************************************************************** */

// const addEmployee = () => {
//     console.log(".....Adding an Employee.....\n");
//     dataConnection.query(
//         "INSERT INTO employee SET ?",
//         {
//             id: 445,
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

//Function to view all employees [VIEW]
const viewAllEmployees = () => {
    console.log("View of Employees........................................\n");
    dataConnection.query(`
    SELECT employee.id AS "ID", employee.fname AS "First Name", employee.lname AS "Last Name", job.title AS "Title", job.salary AS "Salary", 
    department.dname AS "Dept. Name", CONCAT(m.fname, " ",m.lname) AS "Manager"
    FROM employee 
    LEFT JOIN job ON employee.role_id = job.id
    LEFT JOIN department ON job.department_id = department.id
    LEFT JOIN employee m ON m.id = employee.manager_id
    ORDER BY employee.id`, (err, res) => {
        if (err) throw err;
        console.log("...................................................................................................");
        console.log("                                       List of Employees                                           ");
        console.log("...................................................................................................");
        console.table(res);
        console.log("...................................................................................................");
        console.log("                                                                                                   ");
        // console.log("...............................................");
        // console.log("               List of Employees               ");
        // console.log("...............................................");
        // console.log("                                               ");
        // res.forEach(({ id, fname, lname, title, salary, dname, manager }) => {
        // console.log(`${id}:   | ${fname}       ${lname} | ${title}    | ${salary}   |  ${dname}    | ${manager}     `);
        // });
        // console.log("................................................");
        // console.log("                                                ");
        mainViewDatabase();
        
    });
    
};



//Function to VIEW Departments  [VIEW]
const viewDepartments = () => {
    dataConnection.query(`
    SELECT department.id AS "ID", department.dname AS "Name"
    FROM department
    ORDER BY department.id`, (err, res) => {
        if (err) throw err;
        
        console.log(".................................................");
        console.log("               List of Departments               ");
        console.log(".................................................");
        console.table(res);
        console.log(".................................................");
        console.log("                                                 ");
        // Use this ForEach Loop if console.table was not allowed.
        // console.log(".................................................");
        // console.log("               List of Departments               ");
        // res.forEach(({ id, dname }) => {
        // console.log(`${id}:  |  ${dname}: `);
        // });
        mainViewDatabase();
    });
};

//Function to VIEW Roles  [VIEW]
const viewRoles = () => {
    dataConnection.query(`
    SELECT job.id AS "ID", job.title AS "Title", job.salary AS "Salary", job.department_id AS "Department ID"
    FROM job
    ORDER BY job.id`, (err, res) => {
        if (err) throw err;

        console.log(".....................................................");
        console.log("                  List of Roles                      ");
        console.log(".....................................................");
        console.table(res);
        console.log(".....................................................");
        console.log("                                                     ");
        // Use this ForEach Loop if console.table was not allowed.
        // console.log(".....................................................");
        // console.log("                  List of Roles                      ");
        // res.forEach(({ id, title, salary, department_id }) => {
        // console.log(`${id}: \t  |  ${title}: \t\t\t | ${salary}: \t\t\t  | ${department_id}: \t`);
        // });
        mainViewDatabase();
    });
};

// Function to View Managers [VIEW]
const viewMangers = () => {
    dataConnection.query(`
    SELECT employee.fname AS "First Name", employee.lname AS "Last Name", job.title AS "Title"
    FROM employee
    INNER JOIN job ON  employee.role_id = job.id
    WHERE job.title LIKE "%$ Supervisor%" ESCAPE "$"
    ORDER BY job.title`, (err, res) => {
        if (err) throw err;

        console.log("................................................");
        console.log("               List of Managers                 ");
        console.log("................................................");
        console.table(res);
        console.log("                                                ");
        // Use this ForEach Loop if console.table was not allowed.
        // console.log("................................................");
        // console.log("               List of Managers                 ");
        // res.forEach(({ FirstName, LastName, Title }) => {
        //     console.log(`${FirstName}:   | ${LastName}       ${Title}    `);
        // });
        mainViewDatabase();
    });
};



















//Function to view employees by departments [VIEW]**************************************************************
// const viewDepartments2 = () => {
//     inquirer.prompt({
//         type: "rawlist",
//         name: "EmpDepartView",
//         message: "Enter the department to view?",
//         choices: [
//             "Sales",
//             "Marketing",
//             "Entertainment",
//             "Accounting",
//             "Logistics",
//             "Administration",
//         ]
//     })
//         .then((answer) => {
//             const query = `
//         SELECT department.dname as "department", employee.fname as "FirstName", employee.lname as "LastName", employee.e_id as "id"
//         FROM employee
//         LEFT JOIN job ON employee.role_id = job.j_id 
//         LEFT JOIN department ON job.department_id = department.d_id
//         WHERE (department.dname = ? )
//         ORDER BY employee.e_id
//         `;
//             dataConnection.query(query, [answer.EmpDepartView], (err, res) => {
//                 if (err) throw err;
//                 console.table(res);
//                 res.forEach(({ department, FirstName, LastName, id }, i) => {
//                     const num = i + 1;
//                     console.log(
//                         `${num} Department: ${department} || First Name: ${FirstName} || Last Name: ${LastName} || ID: ${id}`
//                     );
//                 });
//                 mainViewDatabase();
//             });
//         });
// }


// Function to view employees by role 22222 [VIEW] ************************************************************
// const viewRoles22222 = () => {
//     inquirer.prompt({
//         type: "rawlist",
//         name: "EmpRoleView",
//         message: "Select ROLES below",
//         choices: [
//             "Sales Person",
//             "Designer",
//             "Artists",
//             "Accountants",
//             "Logistics Specialist",
//             "Human Resource Specialist",
//             "EXIT",
//         ]
//     })
//         .then((answer) => {
//             const query = `
//         SELECT job.title as "title", employee.fname as "FirstName", employee.lname as "LastName", employee.e_id as "e_id"
//         FROM job
//         LEFT JOIN employee ON job.j_id = employee.role_id
//         WHERE (job.title = ? )
//         ORDER BY employee.e_id
//         `;
//             dataConnection.query(query, [answer.EmpRoleView], (err, res) => {
//                 if (err) throw err;
//                 console.table(res);
//                 res.forEach(({ title, FirstName, LastName, e_id }, i) => {
//                     const num = i + 1;
//                     console.log(`Title\t\t\tFirst Name\t\tLast Name\t\tID\t`)
//                     console.log(
//                         `${num} Title: ${title} || First Name: ${FirstName} || Last Name: ${LastName} || ID: ${e_id}`
//                     );
//                 });
//                 mainViewDatabase();
//             });
//         });
// }



//Function to add an employee [ADD EMPLOYEE]
const addEmployee = () => {
    dataConnection.query("SELECT * FROM job", (err, employeeData1) => {
        const employee1 = employeeData1.map(job => {
            return {
                name: job.title,
                value: job.id
            }
        });
        dataConnection.query("SELECT * FROM job", (err, employeeData2) => {
            const employee2 = employeeData2.map(job => {
                return {
                    name: job.title,
                    value: job.id
                }
            });
            inquirer.prompt([
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
                    type: "list",
                    name: "role_id",
                    message: "Enter the role for the new employee: ",
                    choices: employee1

                },
                {
                    type: "list",
                    name: "manager_id",
                    message: "Enter the manager for the new employee: ",
                    choices: employee2

                    // validate: function (input) {
                    //     if (isNaN(input) === false) {
                    //         return true;
                    //     } else if (isNaN(input) === true) {
                    //         console.log("A number needs to be entered");
                    //         return false; //make this into a function with a variable "needNumber"
                    //     }
                    // }
                }
            ]).then((answer) => {
                let values = { fname: answer.fname, lname: answer.lname, role_id: answer.role_id, manager_id: answer.manager_id };
                dataConnection.query("INSERT INTO employee SET ?", values, (err, res) => {
                    if (err) throw err;
                    mainViewDatabase();
                });
            })

        })


    })

}

//Function to add department [ADD DEPARTMENT]
const addDepartment = () => {
    inquirer.prompt([
        {
            type: "input",
            name: "dname",
            message: "Enter the new department name: "
        },
    ]).then((answer) => {
        let values = { dname: answer.dname };
        dataConnection.query("INSERT INTO department SET ?", values, (err, res) => {
            if (err) throw err;
            mainViewDatabase();
        });
    })
};


//Function to add role [ADD ROLE]
const addRole = () => {
    dataConnection.query("Select * FROM department", (err, departmentData) => {
        const departments = departmentData.map(department => {
            return {
                name: department.dname,
                value: department.id
            }
        })

        inquirer.prompt([
            {
                type: "input",
                name: "title",
                message: "Enter the new ROLE title: "
            },
            {
                type: "input",
                name: "salary",
                message: "Enter the new salary for the title: "
            },
            {
                type: "list",
                name: "department_id",
                message: "Enter the department id for this new title: ",
                choices: departments

            },
        ]).then((answer) => {
            let values = { title: answer.title, salary: answer.salary, department_id: answer.department_id };
            dataConnection.query("INSERT INTO job SET ?", values, (err, res) => {
                if (err) throw err;
                mainViewDatabase();
            });
        })
    })

}


// Function to UPDATE Employee Role  [UPDATE]  
const updateEmployeeRole = () => {
    dataConnection.query("SELECT * FROM employee", (err, empData) => {
        const employees = empData.map(employee => {
            return {
                name: employee.lname,
                value: employee.id
            }
        });   
        dataConnection.query("SELECT * FROM job", (err, jobData1) => {
            const jobs = jobData1.map(job => {
                return {
                    name: job.title,
                    value: job.id
                }
            });
            inquirer.prompt([
                {
                    type: "list",
                    name: "employee_id",
                    message: "Select the employee to update: ",
                    choices: employees
                },   
                {
                    type: "list",
                    name: "job_id",
                    message: "Select updated role: ",
                    choices: jobs
                },
            
            ]).then((answer) => {
                let values = [{role_id: answer.job_id }, { id: answer.employee_id }];
                dataConnection.query('UPDATE employee SET ? WHERE ?', values, (err, res) => {
                    if(err) throw err;
                    mainViewDatabase();
                });
            })
        })
    })
};

/************************************************************************************************************* */
// Function to UPDATE Employee Manager  [UPDATE]  
const updateEmployeeManager = () => {
    dataConnection.query("SELECT * FROM employee WHERE id >= '6'", (err, empData) => {
        const employees = empData.map(employee => {
            return {
                name: employee.lname,
                value: employee.id
            }
        });   
        dataConnection.query(`SELECT * FROM employee WHERE (role_id = 2) OR  (role_id = 4) 
            OR (role_id = 6) OR (role_id = 8) OR (role_id = 10)`, (err, managerData) => {
            const managers = managerData.map(employee => {
                return {
                    name: employee.lname,
                    value: employee.id
                }
            });
            inquirer.prompt([
                {
                    type: "list",
                    name: "employee_id",
                    message: "Select the employee to for Manager update: ",
                    choices: employees
                },   
                {
                    type: "rawlist",
                    name: "employee.lname",
                    message: "Select updated Manager: ",
                    choices: managers
                },
            
            ]).then((answer) => {
                let values = [{ manager_id: answer.employee.lname }, { id: answer.employee_id }];
                dataConnection.query('UPDATE employee SET ? WHERE ?', values, (err, res) => {
                    if(err) throw err;
                    mainViewDatabase();
                });
            })
        })
    })
};





































/************************************************************************************************************* */
//Function to update employee role [Update ROLE]******************************************************
// const updateEmployeeRole = () => {
//     inquirer.prompt([
//         {
//             type: "input",
//             name: "role_id",
//             message: "Enter the employee's new role number: "
//         },
//         {
//             type: "input",
//             name: "id",
//             message: "Enter the employee's id number: "
//         },

//     ]).then((answer) => {
//         let query = `
//             UPDATE employee
//             SET role_id = ?
//             WHERE id = ? 
//             `;
//         //Disected the example from https://www.mysqltutorial.org/mysql-nodejs/update/ [Updating data example]
//         let data = [answer.role_id, answer.id];
//         dataConnection.query(query, data, (err, res, fields) => {
//             if (err) throw err;
//             //console.table(res);
//             console.log("Rows Affected: ", res.affectedRows);
//             console.log(`|| Emp ID: ${answer.id} || New Role ID: ${answer.role_id} ||`);
//             //`Role ID: ${role_id} || ${fname} || ${lname} || ${id}`); 
//             mainViewDatabase();
//         });
//     });
// }

// res.forEach(({ title, FirstName, LastName, id }, i) => {
//     const num = i + 1;
//     console.log(`Title\t\t\tFirst Name\t\tLast Name\t\tID\t`)   
//     console.log(
//         `${num} Title: ${title} || First Name: ${FirstName} || Last Name: ${LastName} || ID: ${id}`
//       );
//     });






// const viewDepartmentsXX = () => {
//     console.log("View of Employees by Departments...\n");
//     dataConnection.query("SELECT * FROM department", (err, res) => {
//         if(err) throw err;
//         // console.log(res);
//         console.log("................................");
//         console.log("      List of Departments       ");
//         console.log("................................");
//         console.log("                                ");
//         res.forEach(({ dname }) => {
//         console.log(`${dname}`);
//         });
//         console.log("................................");
//         console.log("                                ");
//         mainViewDatabase();
//     });
// };











//Connection to the Database
dataConnection.connect((err) => {
    if (err) throw err;
    console.log(`You are connected on id ${dataConnection.threadId}\n`);
    //startQuery();
    mainStart();
});