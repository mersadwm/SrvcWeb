/****** Object:  StoredProcedure [dbo].[uspGetAllServicesOfProviders]    Script Date: 8/2/2019 1:44:09 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO


CREATE PROCEDURE [dbo].[uspGetAllServicesOfProviders]

AS
BEGIN

SELECT *
FROM user_serviceprovider left JOIN service_prividers_ref
on service_prividers_ref.user_id= user_serviceprovider.user_id 
left join services on service_prividers_ref.service_id = services.id

END
GO


