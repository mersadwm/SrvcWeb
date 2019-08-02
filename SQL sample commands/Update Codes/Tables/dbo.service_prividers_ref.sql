/****** Object:  Table [dbo].[service_prividers_ref]    Script Date: 8/2/2019 1:35:02 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[service_prividers_ref](
	[sp_id] [int] IDENTITY(1,1) NOT NULL,
	[user_id] [int] NULL,
	[service_id] [int] NULL,
	[more_info] [nvarchar](255) NULL,
PRIMARY KEY CLUSTERED 
(
	[sp_id] ASC
)WITH (STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO

ALTER TABLE [dbo].[service_prividers_ref]  WITH CHECK ADD  CONSTRAINT [fk_serviceid] FOREIGN KEY([service_id])
REFERENCES [dbo].[services] ([id])
GO

ALTER TABLE [dbo].[service_prividers_ref] CHECK CONSTRAINT [fk_serviceid]
GO

ALTER TABLE [dbo].[service_prividers_ref]  WITH CHECK ADD  CONSTRAINT [fk_userid] FOREIGN KEY([user_id])
REFERENCES [dbo].[users] ([user_id])
GO

ALTER TABLE [dbo].[service_prividers_ref] CHECK CONSTRAINT [fk_userid]
GO


