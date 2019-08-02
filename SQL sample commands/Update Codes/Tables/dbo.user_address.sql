/****** Object:  Table [dbo].[user_address]    Script Date: 8/2/2019 1:36:32 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[user_address](
	[address_id] [int] IDENTITY(1,1) NOT NULL,
	[login_name] [nvarchar](40) NULL,
	[address_1] [nvarchar](120) NOT NULL,
	[address_2] [nvarchar](120) NULL,
	[address_3] [nvarchar](120) NULL,
	[city_name] [nvarchar](50) NOT NULL,
	[state_name] [nvarchar](20) NOT NULL,
	[Country] [nvarchar](20) NOT NULL,
	[PLZ] [int] NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[address_id] ASC
)WITH (STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO

ALTER TABLE [dbo].[user_address]  WITH CHECK ADD FOREIGN KEY([login_name])
REFERENCES [dbo].[users] ([login_name])
GO


