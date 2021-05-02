/*This will allow the traditional insert into MySQL
INSERT data into the employee table*/
/****Managers hav a NULL ID*/
USE emptracker_db;
INSERT INTO employee (fname, lname, role_id,manager_id) VALUES 
(Ryan,Raddon,1,2),
(Kevin,Saurer,2,NULL),
(Morten,Harket,3,4),
(Donald,Cornelius,4,NULL),
(Sapphire,Howell,5,6),
(Claude,VonStroke,6,NULL),
(Jai,Wolf,7,8),
(Emilia,Clarke,8,NULL),
(Harrison,Mills,9,10),
Jeffery,Morgan,10,NULL),
Clayton,Knight,1,2),
Ellie,Goulding,3,4),
Chandler,Riggs,5,6),
Aviram,Saharai,7,8),
Isabelle,Rezazadeh,9,10);
