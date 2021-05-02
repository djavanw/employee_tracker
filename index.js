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
            "VIEW Employees By Manager",
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
                case "VIEW Employees By Manager":
                    viewEmployeesByManager();
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

/**********************************************************************************************************/
// Function to VIEW employees by manager
const viewEmployeesByManager = () => {
    dataConnection.query(`SELECT * FROM employee WHERE (role_id = "2") OR (role_id = "4") OR
    (role_id = "6") OR (role_id = "8") OR (role_id = "10")`, (err, employeeData1) => {
        const employByMan = employeeData1.map((employee) => {
            return {
                name: employee.lname,
                value: employee.role_id
            }
        });
        inquirer.prompt([
            {
                type: "rawlist",
                name: "role_id",
                message: "Select a Manager to see employees: ",
                choices: employByMan
            },
        ]).then((answer) => {
            let values = [{manager_id: answer.role_id}];
            dataConnection.query(`
            SELECT * FROM employee
            WHERE manager_id = ${answer.role_id}
            `, values, (err, res) => {
                if (err) throw err;
                console.log(answer)
                console.log(".................................................");
                console.log("    List of Employees By Manager                 ");
                console.log(".................................................");
                console.table(res);
                console.log(".................................................");
                console.log("                                                 ");
                mainViewDatabase();
                });
            })

        })
}



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
                    name: "job.title",
                    message: "Enter the role for the new employee: ",
                    choices: employee1

                },
                {
                    type: "list",
                    name: "job.id",
                    message: "Enter the manager for the new employee: ",
                    choices: employee2
                }
            ]).then((answer) => {
                let values = {fname: answer.fname, lname: answer.lname, role_id: answer.job.title, manager_id: answer.job.id};
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
    dataConnection.query("SELECT * FROM department", (err, departmentData) => {
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
    dataConnection.query(`SELECT * FROM employee WHERE (id != 2) OR (id != 4) OR (id != 6)
        OR (id != 8) OR (id != 10)`, (err, empData) => {
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




//Connection to the Database
dataConnection.connect((err) => {
    if (err) throw err;
    console.log(`You are connected on id ${dataConnection.threadId}\n`);
    //startQuery();
    mainStart();
});

