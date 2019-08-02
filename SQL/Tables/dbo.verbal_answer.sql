/****** Object:  Table [dbo].[verbal_answer]    Script Date: 8/2/2019 1:37:12 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[verbal_answer](
	[question_key] [varchar](255) NULL,
	[txt] [varchar](255) NULL,
	[id] [int] NOT NULL,
	[next_slide_key] [varchar](255) NULL,
PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO

ALTER TABLE [dbo].[verbal_answer]  WITH CHECK ADD FOREIGN KEY([question_key])
REFERENCES [dbo].[question] ([question_key])
GO


