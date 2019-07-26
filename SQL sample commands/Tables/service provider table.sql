create table service_providers (
sp_id int PRIMARY KEY IDENTITY(1,1) NOT NULL,
user_id int FOREIGN KEY REFERENCES dbo.users(user_id) ,
company_name nvarchar (40),
address_sp nvarchar (40),
telephone nvarchar (40),
website_link nvarchar (40),
contact_email nvarchar (50)
)