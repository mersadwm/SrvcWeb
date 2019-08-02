/****** Object:  Table [dbo].[question]    Script Date: 8/2/2019 1:34:10 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[question](
	[questions] [varchar](255) NULL,
	[parent_key] [varchar](255) NULL,
	[moreinfo] [varchar](255) NULL,
	[question_key] [varchar](255) NOT NULL,
	[isvisualized] [bit] NULL,
PRIMARY KEY CLUSTERED 
(
	[question_key] ASC
)WITH (STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO


