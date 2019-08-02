/****** Object:  StoredProcedure [dbo].[uspSearchServiceProvider]    Script Date: 7/28/2019 7:41:17 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
ALTER PROCEDURE [dbo].[uspSearchServiceProvider]
@pServices NVARCHAR(50) 

AS
BEGIN

SELECT *
FROM user_serviceprovider left JOIN service_prividers_ref
on service_prividers_ref.user_id= user_serviceprovider.user_id
where service_id = @pServices

END
