CREATE PROCEDURE dbo.uspChangePass
    @pLoginName NVARCHAR(50), 
    @pOldPassword NVARCHAR(50),
    @pNewPassword NVARCHAR(50),
	@salt NVARCHAR (36)
	
AS 
BEGIN

if(login_name = @pLoginName and password_hash = HASHBYTES('SHA2_512', @pOldPassword+CAST(salt AS NVARCHAR(36))))
then
    insert into users (password_hash, salt) values(HASHBYTES('SHA2_512', @pNewPassword+CAST(@salt AS NVARCHAR(36))), @salt);
else
        set result = false;
end if;
select result;
END $$ DELIMITER ;

    where  
GO