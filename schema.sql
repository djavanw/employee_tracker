DROP DATABASE IF EXISTS emptracker_db;

CREATE DATABASE emptracker_db;

USE emptracker_db;

DROP TABLE IF EXISTS department;

CREATE TABLE department (
    d_id INT PRIMARY KEY,
    dname VARCHAR(30) NOT NULL
);

DROP TABLE IF EXISTS job;

CREATE TABLE job (
    j_id INT PRIMARY KEY,
    title VARCHAR(30) NOT NULL,
    salary DECIMAL(10,2) NOT NULL,
    department_id INT NOT NULL,
    FOREIGN KEY (department_id) REFERENCES department(d_id) ON
    DELETE CASCADE ON UPDATE RESTRICT
);

DROP TABLE IF EXISTS employee;

CREATE TABLE employee (
    e_id INT PRIMARY KEY,
    fname VARCHAR(30) NOT NULL,
    lname VARCHAR(30) NOT NULL,
    role_id INT NOT NULL,
    manager_id INT NULL,
    FOREIGN KEY (role_id) REFERENCES job(j_id) ON
    DELETE CASCADE ON UPDATE RESTRICT,
    FOREIGN KEY (manager_id) REFERENCES employee(e_id) ON
    DELETE CASCADE ON UPDATE RESTRICT
);







