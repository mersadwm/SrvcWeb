CREATE PROCEDURE [dbo].[uspServices_ref]
    @pLogin NVARCHAR(50), 
    @pservice NVARCHAR(50),
	@pmore_info NVARCHAR(50)

AS    
BEGIN
    INSERT INTO dbo.service_prividers_ref (user_id, service_id, more_info) 
	values(
	(select user_id
		from dbo.users
		where login_name = @pLogin),
	(select id
		from dbo.services
		where id = @pservice),
	(@pmore_info)
	)

END