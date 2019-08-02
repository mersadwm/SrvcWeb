/****** Object:  StoredProcedure [dbo].[uspService_Provider]    Script Date: 8/2/2019 1:45:05 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [dbo].[uspService_Provider]
    @plogin_user NVARCHAR(50),
	@puser_id int,
	@pcompany_name NVARCHAR(40),
	@paddress_sp NVARCHAR(40),
	@ptelephone NVARCHAR(40),
	@pwebsite_link NVARCHAR(40),
	@pcontact_email NVARCHAR(50),
	@pzip INT,
	@pcity NVARCHAR(50),
	@pabout_me NVARCHAR(255),
	@pverified BIT

AS    
BEGIN
    INSERT INTO dbo.service_providers(user_id, company_name, address_sp, telephone,website_link, contact_email, zip, city, about_me, verified, login_user) 
	values(@puser_id, @pcompany_name, @paddress_sp, @ptelephone, @pwebsite_link, @pcontact_email, @pzip, @pcity, @pabout_me, @pverified, @plogin_user)

END
GO


