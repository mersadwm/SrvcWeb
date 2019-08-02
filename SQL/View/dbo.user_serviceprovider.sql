/****** Object:  View [dbo].[user_serviceprovider]    Script Date: 8/2/2019 1:38:22 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE VIEW [dbo].[user_serviceprovider]
AS
SELECT        users.user_id, users.first_name, users.last_name, users.email, service_providers.company_name, service_providers.address_sp, service_providers.telephone, service_providers.website_link, 
                         service_providers.contact_email, service_providers.zip, service_providers.city, service_providers.about_me, dbo.users.profile_pic_url
FROM            dbo.users INNER JOIN
                         dbo.service_providers ON users.user_id = service_providers.user_id
GO


