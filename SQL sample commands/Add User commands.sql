DECLARE @responseMessage NVARCHAR(250)
EXEC dbo.uspAddUser
          @pLogin = N'FirstAdmin',
          @pPassword = N'123',
          @pFirstName = N'Admin',
          @pLastName = N'Administrator',
          @responseMessage= @responseMessage OUTPUT;


SELECT *
FROM dbo.users;