DROP DATABASE IF EXISTS emptracker_db;

CREATE DATABASE emptracker_db;

USE emptracker_db;

DROP TABLE IF EXISTS department;

CREATE TABLE department (
    id INT AUTO_INCREMENT,
    dname VARCHAR(30) NOT NULL,
    PRIMARY KEY (id)
);

DROP TABLE IF EXISTS job;

CREATE TABLE job (
    id INT AUTO_INCREMENT,
    title VARCHAR(30) NOT NULL,
    salary DECIMAL(10,2) NOT NULL,
    department_id INT NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (department_id) REFERENCES department(id)
);

DROP TABLE IF EXISTS employee;
USE emptracker_db;
CREATE TABLE employee (
    id INT AUTO_INCREMENT,
    fname VARCHAR(30) NOT NULL,
    lname VARCHAR(30) NOT NULL,
    role_id INT NOT NULL,
    manager_id INT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (role_id) REFERENCES job(id),
    FOREIGN KEY (manager_id) REFERENCES employee(id)
);







