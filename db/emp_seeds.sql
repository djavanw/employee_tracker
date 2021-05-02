/*This will allow the traditional insert into MySQL
INSERT data into the employee table*/
USE emptracker_db;
/*Managers*/
INSERT INTO employee (fname, lname, role_id,manager_id) VALUES 
("Kevin","Saurer",2,NULL),
("Donald","Cornelius",4,NULL),
("Claude","VonStroke",6,NULL),
("Emilia","Clarke",8,NULL),
("Jeffery","Morgan",10,NULL),
/*Non Managers*/
("Jeff","Saurer",1,1),
("Morten","Harket",3,2),
("Sapphire","Howell",5,3),
("Jai","Wolf",7,4),
("Harrison","Mills",9,5),
("Clayton","Knight",9,5),
("Ellie","Goulding",1,1),
("Chandler","Riggs",3,2),
("Aviram","Saharai",5,3),
("Isabelle","Rezazadeh",7,4);