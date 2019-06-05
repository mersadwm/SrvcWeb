DECLARE	@responseMessage nvarchar(250)

--Correct login and password
EXEC	dbo.uspLogin
		@pLoginName = N'emersad',
		@pPassword = N'007',
		@responseMessage = @responseMessage OUTPUT

SELECT	@responseMessage as N'@responseMessage'

DECLARE	@responseMessage nvarchar(250)
--Incorrect login
EXEC	dbo.uspLogin
		@pLoginName = N'Admin1', 
		@pPassword = N'123',
		@responseMessage = @responseMessage OUTPUT

SELECT	@responseMessage as N'@responseMessage'

DECLARE	@responseMessage nvarchar(250)
--Incorrect password
EXEC	dbo.uspLogin
		@pLoginName = N'Admin', 
		@pPassword = N'1234',
		@responseMessage = @responseMessage OUTPUT

SELECT	@responseMessage as N'@responseMessage'