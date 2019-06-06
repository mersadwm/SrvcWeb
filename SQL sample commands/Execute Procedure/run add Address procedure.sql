DECLARE @responseMessage NVARCHAR(250)

EXEC dbo.uspAddAddress
    @pLogin = N'akbar',
    @pAddress1 = N'gaußstrasse 14',
    @pAddress2 = N'',
    @pAddress3 = N'',
    @pPLZ = '60316',
    @pCity_name = N'Frankfurt',
    @pState_name = N'Hessen',
    @pCountry = N'Germany',
    @responseMessage = @responseMessage OUTPUT