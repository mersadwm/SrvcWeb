/****** Object:  Table [dbo].[service_providers]    Script Date: 8/2/2019 1:35:31 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[service_providers](
	[sp_id] [int] IDENTITY(1,1) NOT NULL,
	[user_id] [int] NULL,
	[company_name] [nvarchar](40) NULL,
	[address_sp] [nvarchar](40) NULL,
	[telephone] [nvarchar](40) NULL,
	[website_link] [nvarchar](40) NULL,
	[contact_email] [nvarchar](50) NULL,
	[zip] [int] NULL,
	[city] [nvarchar](50) NULL,
	[about_me] [nvarchar](255) NULL,
	[verified] [bit] NULL,
	[login_user] [nvarchar](50) NULL,
PRIMARY KEY CLUSTERED 
(
	[sp_id] ASC
)WITH (STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO

ALTER TABLE [dbo].[service_providers] ADD  CONSTRAINT [DF_service_providers_verified]  DEFAULT ((0)) FOR [verified]
GO

ALTER TABLE [dbo].[service_providers]  WITH CHECK ADD FOREIGN KEY([user_id])
REFERENCES [dbo].[users] ([user_id])
GO

ALTER TABLE [dbo].[service_providers]  WITH CHECK ADD FOREIGN KEY([user_id])
REFERENCES [dbo].[users] ([user_id])
GO

ALTER TABLE [dbo].[service_providers]  WITH CHECK ADD FOREIGN KEY([user_id])
REFERENCES [dbo].[users] ([user_id])
GO

ALTER TABLE [dbo].[service_providers]  WITH CHECK ADD FOREIGN KEY([user_id])
REFERENCES [dbo].[users] ([user_id])
GO


