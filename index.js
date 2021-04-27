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
const addOptions = {
    Add_Department: "Allows user to add a department",
    Add_Employee: "Allows user to add an employee",
    Add_Role: "Allows user to add a role",
    EXIT: "Exit"   
};

const startQuery = () => {
    inquirer.prompt ({
        type: "rawlist",
        name: "action",
        message: "Select an option to add: ",
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
                addDepartments();
                break;
            case addOptions.Add_Employee:
                addEmployees();
                break;
            case addOptions.Add_Role:
                addRoles();
                break;
            case selectionOptions.EXIT:
                connection.end();
                process.exit(1);
                break;
            default:
                console.log(`Select an action: ${answer.action}`);
                break;
        }
    });
};

const addEmployees = ()=> {
    inquirer.prompt ([
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
            name: "e_id",
            message: "Enter the id number for the new employee: " 
        },
        {
            type: "input",
            name: "role_id",
            message: "Enter the role id for the new employee: " 
        },
        {
            type: "input",
            name: "manager_id",
            message: "Enter the manager id for the new employee: "  
        }
    ]).then((answer) => {
        let e_id = answer.e_id;
        let fname = answer.fname;
        let lname = answer.lname;
        let role_id = answer.role_id;
        let manager_id = answer.manager_id;
        dataConnection.query(`INSERT INTO employee (e_id, fname, lname, role_id, manager_id) VALUES (${e_id}, ${fname}, ${lname}, ${role_id},${manager_id})`,
            [
                e_id, fname, lname, role_id, manager_id
            ], (err) => {
                if(err, res) throw err;
                viewEmployees();
            })
    })
}



// const addEmployees = () => {
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
//             viewEmployees();
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
    startQuery();
});


