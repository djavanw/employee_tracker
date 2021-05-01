DROP DATABASE IF EXISTS emptracker_db;

CREATE DATABASE emptracker_db;

USE emptracker_db;

DROP TABLE IF EXISTS department;

CREATE TABLE department (
    id INT AUTO_INCREMENT PRIMARY KEY,
    dname VARCHAR(30) NOT NULL
);

DROP TABLE IF EXISTS job;

CREATE TABLE job (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(30) NOT NULL,
    salary DECIMAL(10,2) NOT NULL,
    department_id INT NOT NULL,
    FOREIGN KEY (department_id) REFERENCES department(id)
);

DROP TABLE IF EXISTS employee;

CREATE TABLE employee (
    id INT AUTO_INCREMENT PRIMARY KEY,
    fname VARCHAR(30) NOT NULL,
    lname VARCHAR(30) NOT NULL,
    role_id INT NOT NULL,
    manager_id INT NULL,
    FOREIGN KEY (role_id) REFERENCES job(id),
    FOREIGN KEY (manager_id) REFERENCES employee(id)
);







