/*This will allow the traditional insert into MySQL
INSERT data into the employee table*/
USE emptracker_db;

/*Managers*/
INSERT INTO employee (e_id, fname, lname, role_id) VALUES 
(050,"Kevin","Saurer",300),
(090,"Donald","Cornelius",100),
(130,"Claude","VonStroke",150),
(150,"Emilia","Clarke",200),
(170,"Jeffery","Morgan",250);

/*Non Managers*/
INSERT INTO employee (e_id, fname, lname, role_id, manager_id) VALUES
(060,"Jeff","Saurer",200,150),
(070,"Morten","Harket",250,170),
(080,"Sapphire","Howell",150,130),
(100,"Jai","Wolf",300,050),
(110,"Harrison","Mills",100,090),
(120,"Clayton","Knight",150,130),
(140,"Ellie","Goulding",100,090),
(160,"Chandler","Riggs",350,150),
(180,"Aviram","Saharai",300,050),
(190,"Isabelle","Rezazadeh",250,170);