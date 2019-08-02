/****** Object:  Table [dbo].[users]    Script Date: 8/2/2019 1:36:53 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[users](
	[user_id] [int] IDENTITY(1,1) NOT NULL,
	[login_name] [nvarchar](40) NOT NULL,
	[password_hash] [binary](64) NOT NULL,
	[first_name] [nvarchar](40) NULL,
	[last_name] [nvarchar](40) NULL,
	[Salt] [uniqueidentifier] NULL,
	[email] [nvarchar](50) NOT NULL,
	[admin_rights] [bit] NULL,
	[profile_pic_url] [nvarchar](255) NULL,
PRIMARY KEY CLUSTERED 
(
	[user_id] ASC
)WITH (STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF) ON [PRIMARY],
UNIQUE NONCLUSTERED 
(
	[email] ASC
)WITH (STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF) ON [PRIMARY],
UNIQUE NONCLUSTERED 
(
	[login_name] ASC
)WITH (STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO

ALTER TABLE [dbo].[users] ADD  DEFAULT ((0)) FOR [admin_rights]
GO


