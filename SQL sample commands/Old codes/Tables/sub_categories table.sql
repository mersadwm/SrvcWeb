create table sub_categories 
(
cat_id int IDENTITY(1,1) primary key,
cat_parid int default 0,
cat_name nvarchar (20) not null,
cat_des nvarchar (60),
CONSTRAINT fk_cat_parid FOREIGN KEY (cat_parid)
REFERENCES dbo.categories (cat_id)
);

select * from sub_categories;

