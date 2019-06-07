create table users (
user_id int primary key IDENTITY(1,1) NOT NULL,
login_name nvarchar (40) not null unique,
password_hash binary (64) not null,
first_name nvarchar (40),
last_name nvarchar (40),
Salt uniqueidentifier,
email nvarchar (50) unique not null,
admin_rights bit default 0,
profile_pic_url nvarchar (255),
)