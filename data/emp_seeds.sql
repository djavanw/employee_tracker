--This will allow the traditional insert into MySQL
--INSERT data into the employee table
USE emptracker_db;

INSERT INTO employee (e_id, fname, lname, role_id, manager_id) VALUES 
(050,"Kevin","Saurer",30,0),
(060,"Jeff","Saurer",20,0),
(070,"Morten","Harket",25,0),
(080,"Sapphire","Howell",15,0),
(090,"Donald","Cornelius",10,903),**
(100,"Jai","Wolf",30,5),
(110,"Harrison","Mills",10,900),**
(120,"Clayton","Knight",15,0),
(130,"Claude","VonStroke",15,0),
(140,"Ellie","Goulding",10,901),**
(150,"Emilia","Clarke",20,0),
(160,"Chandler","Riggs",35,0),
(170,"Jeffery","Morgan",25,902),**
(180,"Aviram","Saharai",30,0),
(190,"Isabelle","Rezazadeh",25,0);
