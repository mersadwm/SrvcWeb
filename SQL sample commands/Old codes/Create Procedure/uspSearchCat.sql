CREATE PROCEDURE dbo.uspSearchServiceProvider
@pServices NVARCHAR(50) 

AS
BEGIN

SELECT first_name, last_name, email, profile_pic_url
FROM users JOIN service_prividers_ref
on (select user_id from service_prividers_ref where service_id = @pServices) = users.user_id;

END