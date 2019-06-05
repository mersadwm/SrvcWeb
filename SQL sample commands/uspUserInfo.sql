create PROCEDURE dbo.uspUserInfo
    @pLogin NVARCHAR(50), 
    @pPassword NVARCHAR(50)

AS    
BEGIN
    select first_name, last_name, email from dbo.users
    where @pLogin = login_name and @pPassword = password_hash;
END