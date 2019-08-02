CREATE TABLE dbo.services (
    id       INT PRIMARY KEY ,
    title    NVARCHAR (255) ,
    category NVARCHAR (255) ,
	super_cat NVARCHAR (50) ,
	name NVARCHAR (50),
	pic NVARCHAR (50),
	info NVARCHAR (50)
	)





	drop table dbo.services;
