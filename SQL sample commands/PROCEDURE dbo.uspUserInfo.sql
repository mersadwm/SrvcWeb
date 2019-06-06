ALTER PROCEDURE dbo.uspUserInfo
    @pLogin NVARCHAR(50), 
    @pPassword NVARCHAR(50)

AS    
BEGIN

    select first_name, last_name, email , admin_rights, profile_pic_url, address_1, address_2, address_3, city_name, state_name, Country, PLZ 
    from dbo.users JOIN dbo.user_address 
    on users.login_name = user_address.login_name
    where @pLogin = users.login_name and @pPassword = password_hash;
END