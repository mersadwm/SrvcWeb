/****** Object:  Table [dbo].[services]    Script Date: 8/2/2019 1:35:51 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[services](
	[id] [int] NOT NULL,
	[title] [nvarchar](255) NULL,
	[category] [nvarchar](255) NULL,
	[super_cat] [nvarchar](50) NULL,
	[name] [nvarchar](50) NULL,
	[pic] [nvarchar](50) NULL,
	[info] [nvarchar](50) NULL,
PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO


