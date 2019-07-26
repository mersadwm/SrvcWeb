CREATE PROCEDURE dbo.uspService_Provider
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
    INSERT INTO dbo.service_providers(company_name, address_sp, telephone, website_link, contact_email, zip, city, about_me, verified) 
	values(@pcompany_name, @paddress_sp, @ptelephone, @pwebsite_link, @pcontact_email, @pzip, @pcity, @pabout_me, @pverified)

END
