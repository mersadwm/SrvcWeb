/****** Object:  StoredProcedure [dbo].[uspAddAddress]    Script Date: 8/2/2019 1:43:19 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [dbo].[uspAddAddress]
    @pLogin NVARCHAR(50), 
    @pAddress1 NVARCHAR(120),
    @pAddress2 NVARCHAR(120),
    @pAddress3 NVARCHAR(120),
    @pPLZ INT,
    @pCity_name nvarchar(50),
    @pState_name nvarchar(20),
    @pCountry nvarchar(20),
    @responseMessage NVARCHAR(250) OUTPUT
AS
BEGIN
    BEGIN TRY

        INSERT INTO dbo.user_address (login_name, address_1, address_2, address_3, PLZ, city_name, state_name, Country)
        VALUES(@pLogin, @pAddress1, @pAddress2, @pAddress3, @pPLZ, @pCity_name, @pState_name, @pCountry)

       SET @responseMessage='Success'

    END TRY
    BEGIN CATCH
        SET @responseMessage=ERROR_MESSAGE() 
    END CATCH

END
GO


