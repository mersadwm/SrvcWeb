/****** Object:  StoredProcedure [dbo].[uspUserInfo]    Script Date: 8/2/2019 1:45:41 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [dbo].[uspUserInfo]
    @pLogin NVARCHAR(50), 
    @pPassword NVARCHAR(50)

AS    
BEGIN
    select first_name, last_name, users.login_name, email , admin_rights, profile_pic_url, address_1, address_2, address_3, city_name, state_name, Country, PLZ 
    from dbo.users LEFT JOIN  dbo.user_address 
    on users.login_name = user_address.login_name
    where users.login_name= @pLogin and users.password_hash = HASHBYTES('SHA2_512', @pPassword+CAST(salt AS NVARCHAR(36)));
END
GO


