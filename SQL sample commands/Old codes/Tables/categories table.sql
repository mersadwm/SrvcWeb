insert into dbo.categories (cat_id, cat_parid, cat_name, cat_des) values (1,1,'Categories','General Description');


create table categories 
(
cat_id int IDENTITY(1,1) primary key,
cat_name nvarchar (20) not null,
cat_des nvarchar (60),

);


drop table categories;