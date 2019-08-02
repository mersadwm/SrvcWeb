/****** Object:  StoredProcedure [dbo].[uspLogin]    Script Date: 8/2/2019 1:44:31 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [dbo].[uspLogin]
    @pLoginName NVARCHAR(254),
    @pPassword NVARCHAR(50),
    @responseMessage NVARCHAR(250)='' OUTPUT
AS
BEGIN

    SET NOCOUNT ON

    DECLARE @userID INT

    IF EXISTS (SELECT TOP 1 user_id FROM dbo.users WHERE login_name=@pLoginName)
    BEGIN
        SET @userID=(SELECT user_id FROM dbo.users WHERE login_name=@pLoginName AND password_Hash=HASHBYTES('SHA2_512', @pPassword+CAST(Salt AS NVARCHAR(36))))

       IF(@userID IS NULL)
           SET @responseMessage='Incorrect password'
       ELSE 
           SET @responseMessage='User successfully logged in'
           SELECT login_name, first_name FROM dbo.users WHERE login_name=@pLoginName
    END
    ELSE
       SET @responseMessage='Invalid login'

END
GO


