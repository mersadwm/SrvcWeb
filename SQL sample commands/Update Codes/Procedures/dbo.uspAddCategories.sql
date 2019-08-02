/****** Object:  StoredProcedure [dbo].[uspAddCategories]    Script Date: 8/2/2019 1:43:35 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [dbo].[uspAddCategories]
    @pCategorie NVARCHAR(50), 
    @pDescription NVARCHAR(50),
    @pParentID int
AS 
BEGIN
    insert into categories (cat_name, cat_des, par_id) values(@pCategorie, @pDescription, @pParentID);
END;
GO


