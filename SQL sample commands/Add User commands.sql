DECLARE @responseMessage NVARCHAR(250)

EXEC dbo.uspAddUser
          @pLogin = N'omarasaad',
          @pPassword = N'0000',
          @pFirstName = N'Omar',
          @pLastName = N'Asaad',
          @pEmail = N'omar.asaad@sap.de',
          @responseMessage=@responseMessage OUTPUT

SELECT *
FROM dbo.users