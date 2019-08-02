/****** Object:  StoredProcedure [dbo].[uspServices_ref]    Script Date: 8/2/2019 1:45:22 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

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
		where title = @pservice),
	(@pmore_info)
	)

END
GO


