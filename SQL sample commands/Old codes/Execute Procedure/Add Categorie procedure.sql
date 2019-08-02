EXEC dbo.uspAddCategories
    @pCategorie = N'test',
    @pDescription = N'testdescription',
    @pParentID = N'1';

select * from categories;