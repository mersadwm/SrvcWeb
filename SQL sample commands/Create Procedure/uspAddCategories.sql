CREATE PROCEDURE dbo.uspAddCategories
    @pCategorie NVARCHAR(50), 
    @pDescription NVARCHAR(50),
    @pParentID int
AS 
BEGIN
    insert into categories (cat_name, cat_des, par_id) values(@pCategorie, @pDescription, @pParentID);
END;