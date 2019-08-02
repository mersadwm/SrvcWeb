/****** Object:  StoredProcedure [dbo].[uspSearchServiceProvider]    Script Date: 8/2/2019 1:44:49 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [dbo].[uspSearchServiceProvider]
@pServices NVARCHAR(50) 

AS
BEGIN

SELECT *
FROM user_serviceprovider left JOIN service_prividers_ref
on service_prividers_ref.user_id= user_serviceprovider.user_id
left join services on service_prividers_ref.service_id = services.id
where service_id = @pServices

END
GO


