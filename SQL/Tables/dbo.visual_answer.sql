/****** Object:  Table [dbo].[visual_answer]    Script Date: 8/2/2019 1:37:34 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[visual_answer](
	[question_key] [varchar](255) NULL,
	[image_description] [varchar](255) NULL,
	[id] [int] NOT NULL,
	[next_slide_key] [varchar](255) NULL,
	[image_caption] [varchar](255) NULL,
	[image_url] [varchar](255) NULL,
PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO

ALTER TABLE [dbo].[visual_answer]  WITH CHECK ADD FOREIGN KEY([question_key])
REFERENCES [dbo].[question] ([question_key])
GO


