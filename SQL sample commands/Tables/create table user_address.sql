create table user_address (
address_id int IDENTITY(1,1) primary key NOT NULL,
login_name nvarchar (40) FOREIGN KEY REFERENCES users(login_name),
address_1 nvarchar(120) NOT NULL,
address_2 nvarchar(120),
address_3 nvarchar(120),
PLZ nvarchar(6),
city_name nvarchar(50) NOT NULL,
state_name nvarchar(20) NOT NULL,
Country nvarchar(20) NOT NULL,
)