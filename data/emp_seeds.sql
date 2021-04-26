--This will allow the traditional insert into MySQL
--INSERT data into the employee table
USE emptracker_db;

INSERT INTO employee (e_id, fname, lname, role_id, manager_id) VALUES 
(050,"Kevin","Saurer",30,NULL),
(060,"Jeff","Saurer",20,150),
(070,"Morten","Harket",25,170),
(080,"Sapphire","Howell",15,130),
(090,"Donald","Cornelius",10,NULL),
(100,"Jai","Wolf",30,050),
(110,"Harrison","Mills",10,090),
(120,"Clayton","Knight",15,130),
(130,"Claude","VonStroke",15,NULL),
(140,"Ellie","Goulding",10,090),
(150,"Emilia","Clarke",20,NULL),
(160,"Chandler","Riggs",35,150),
(170,"Jeffery","Morgan",25,NULL),
(180,"Aviram","Saharai",30,050),
(190,"Isabelle","Rezazadeh",25,170);
