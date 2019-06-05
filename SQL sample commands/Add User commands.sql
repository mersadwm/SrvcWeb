DECLARE @responseMessage NVARCHAR(250)

EXEC dbo.uspAddUser
          @pLogin = N'Akdfbar',
          @pPassword = N'12d3',
          @pEmail = N'ab@gmaidl.com',
          @responseMessage = @responseMessage OUTPUT