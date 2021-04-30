/*This will allow the traditional insert into MySQL
INSERT data into the employee table*/
USE emptracker_db;

/*Managers*/
INSERT INTO employee (fname, lname, role_id) VALUES 
("Kevin","Saurer",2),
("Donald","Cornelius,",4),
("Claude","VonStroke",6),
("Emilia","Clarke",8),
("Jeffery","Morgan",10);

/*Non Managers*/
INSERT INTO employee (fname, lname, role_id) VALUES
("Jeff","Saurer",1),
("Morten","Harket",3),
("Sapphire","Howell",5),
("Jai","Wolf",7),
("Harrison","Mills",9),
("Clayton","Knight",11),
("Ellie","Goulding",1),
("Chandler","Riggs",3),
("Aviram","Saharai",5),
("Isabelle","Rezazadeh",7);