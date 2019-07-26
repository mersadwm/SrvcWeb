EXEC dbo.uspService_Provider
	@pcompany_name ='',
	@paddress_sp ='',
	@ptelephone ='',
	@pwebsite_link ='',
	@pcontact_email ='',
	@pzip = 60316,
	@pcity ='',
	@pabout_me ='',
	@pverified = 1


	select * from service_providers;