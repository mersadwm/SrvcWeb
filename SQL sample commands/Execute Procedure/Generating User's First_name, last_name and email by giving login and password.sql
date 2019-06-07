--Generating User's First_name, last_name and email by giving login and password
EXEC	dbo.uspUserInfo
		@pLogin = 'firstuser',
		@pPassword = '1111'
