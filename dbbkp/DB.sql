USE [master]
GO
/****** Object:  Database [TASK_MANAGEMENT]    Script Date: 16-05-2024 17:02:33 ******/
CREATE DATABASE [TASK_MANAGEMENT]
 CONTAINMENT = NONE
 ON  PRIMARY 
( NAME = N'TASK_MANAGEMENT', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL15.MSSQLSERVER\MSSQL\DATA\TASK_MANAGEMENT.mdf' , SIZE = 8192KB , MAXSIZE = UNLIMITED, FILEGROWTH = 65536KB )
 LOG ON 
( NAME = N'TASK_MANAGEMENT_log', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL15.MSSQLSERVER\MSSQL\DATA\TASK_MANAGEMENT_log.ldf' , SIZE = 8192KB , MAXSIZE = 2048GB , FILEGROWTH = 65536KB )
 WITH CATALOG_COLLATION = DATABASE_DEFAULT
GO
ALTER DATABASE [TASK_MANAGEMENT] SET COMPATIBILITY_LEVEL = 150
GO
IF (1 = FULLTEXTSERVICEPROPERTY('IsFullTextInstalled'))
begin
EXEC [TASK_MANAGEMENT].[dbo].[sp_fulltext_database] @action = 'enable'
end
GO
ALTER DATABASE [TASK_MANAGEMENT] SET ANSI_NULL_DEFAULT OFF 
GO
ALTER DATABASE [TASK_MANAGEMENT] SET ANSI_NULLS OFF 
GO
ALTER DATABASE [TASK_MANAGEMENT] SET ANSI_PADDING OFF 
GO
ALTER DATABASE [TASK_MANAGEMENT] SET ANSI_WARNINGS OFF 
GO
ALTER DATABASE [TASK_MANAGEMENT] SET ARITHABORT OFF 
GO
ALTER DATABASE [TASK_MANAGEMENT] SET AUTO_CLOSE OFF 
GO
ALTER DATABASE [TASK_MANAGEMENT] SET AUTO_SHRINK OFF 
GO
ALTER DATABASE [TASK_MANAGEMENT] SET AUTO_UPDATE_STATISTICS ON 
GO
ALTER DATABASE [TASK_MANAGEMENT] SET CURSOR_CLOSE_ON_COMMIT OFF 
GO
ALTER DATABASE [TASK_MANAGEMENT] SET CURSOR_DEFAULT  GLOBAL 
GO
ALTER DATABASE [TASK_MANAGEMENT] SET CONCAT_NULL_YIELDS_NULL OFF 
GO
ALTER DATABASE [TASK_MANAGEMENT] SET NUMERIC_ROUNDABORT OFF 
GO
ALTER DATABASE [TASK_MANAGEMENT] SET QUOTED_IDENTIFIER OFF 
GO
ALTER DATABASE [TASK_MANAGEMENT] SET RECURSIVE_TRIGGERS OFF 
GO
ALTER DATABASE [TASK_MANAGEMENT] SET  DISABLE_BROKER 
GO
ALTER DATABASE [TASK_MANAGEMENT] SET AUTO_UPDATE_STATISTICS_ASYNC OFF 
GO
ALTER DATABASE [TASK_MANAGEMENT] SET DATE_CORRELATION_OPTIMIZATION OFF 
GO
ALTER DATABASE [TASK_MANAGEMENT] SET TRUSTWORTHY OFF 
GO
ALTER DATABASE [TASK_MANAGEMENT] SET ALLOW_SNAPSHOT_ISOLATION OFF 
GO
ALTER DATABASE [TASK_MANAGEMENT] SET PARAMETERIZATION SIMPLE 
GO
ALTER DATABASE [TASK_MANAGEMENT] SET READ_COMMITTED_SNAPSHOT OFF 
GO
ALTER DATABASE [TASK_MANAGEMENT] SET HONOR_BROKER_PRIORITY OFF 
GO
ALTER DATABASE [TASK_MANAGEMENT] SET RECOVERY FULL 
GO
ALTER DATABASE [TASK_MANAGEMENT] SET  MULTI_USER 
GO
ALTER DATABASE [TASK_MANAGEMENT] SET PAGE_VERIFY CHECKSUM  
GO
ALTER DATABASE [TASK_MANAGEMENT] SET DB_CHAINING OFF 
GO
ALTER DATABASE [TASK_MANAGEMENT] SET FILESTREAM( NON_TRANSACTED_ACCESS = OFF ) 
GO
ALTER DATABASE [TASK_MANAGEMENT] SET TARGET_RECOVERY_TIME = 60 SECONDS 
GO
ALTER DATABASE [TASK_MANAGEMENT] SET DELAYED_DURABILITY = DISABLED 
GO
ALTER DATABASE [TASK_MANAGEMENT] SET ACCELERATED_DATABASE_RECOVERY = OFF  
GO
EXEC sys.sp_db_vardecimal_storage_format N'TASK_MANAGEMENT', N'ON'
GO
ALTER DATABASE [TASK_MANAGEMENT] SET QUERY_STORE = OFF
GO
USE [TASK_MANAGEMENT]
GO
/****** Object:  Table [dbo].[ProjectMembers]    Script Date: 16-05-2024 17:02:34 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[ProjectMembers](
	[ProjectId] [int] NOT NULL,
	[User_id] [int] NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[ProjectId] ASC,
	[User_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Projects]    Script Date: 16-05-2024 17:02:34 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Projects](
	[ProjectId] [int] IDENTITY(1,1) NOT NULL,
	[ProjectName] [varchar](255) NOT NULL,
	[ProjectDetails] [text] NULL,
	[CreatedBy] [int] NULL,
PRIMARY KEY CLUSTERED 
(
	[ProjectId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Roles]    Script Date: 16-05-2024 17:02:34 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Roles](
	[role_id] [int] IDENTITY(1,1) NOT NULL,
	[role_name] [varchar](50) NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[role_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[TaskAssignments]    Script Date: 16-05-2024 17:02:34 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[TaskAssignments](
	[TaskID] [int] NOT NULL,
	[User_id] [int] NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[TaskID] ASC,
	[User_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Tasks]    Script Date: 16-05-2024 17:02:34 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Tasks](
	[TaskID] [int] IDENTITY(1,1) NOT NULL,
	[TaskName] [varchar](255) NOT NULL,
	[TaskDescription] [text] NULL,
	[TaskType] [varchar](50) NULL,
	[Status] [varchar](50) NULL,
	[ProjectId] [int] NULL,
	[StartDate] [datetime] NULL,
	[DueDate] [datetime] NULL,
PRIMARY KEY CLUSTERED 
(
	[TaskID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Users]    Script Date: 16-05-2024 17:02:34 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Users](
	[User_id] [int] IDENTITY(1,1) NOT NULL,
	[Username] [varchar](100) NOT NULL,
	[Email] [varchar](100) NOT NULL,
	[PasswordHash] [varchar](255) NOT NULL,
	[Role_id] [int] NULL,
PRIMARY KEY CLUSTERED 
(
	[User_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
ALTER TABLE [dbo].[ProjectMembers]  WITH CHECK ADD FOREIGN KEY([ProjectId])
REFERENCES [dbo].[Projects] ([ProjectId])
GO
ALTER TABLE [dbo].[ProjectMembers]  WITH CHECK ADD FOREIGN KEY([User_id])
REFERENCES [dbo].[Users] ([User_id])
GO
ALTER TABLE [dbo].[Projects]  WITH CHECK ADD FOREIGN KEY([CreatedBy])
REFERENCES [dbo].[Users] ([User_id])
GO
ALTER TABLE [dbo].[TaskAssignments]  WITH CHECK ADD FOREIGN KEY([TaskID])
REFERENCES [dbo].[Tasks] ([TaskID])
GO
ALTER TABLE [dbo].[TaskAssignments]  WITH CHECK ADD FOREIGN KEY([User_id])
REFERENCES [dbo].[Users] ([User_id])
GO
ALTER TABLE [dbo].[Tasks]  WITH CHECK ADD FOREIGN KEY([ProjectId])
REFERENCES [dbo].[Projects] ([ProjectId])
GO
ALTER TABLE [dbo].[Users]  WITH CHECK ADD FOREIGN KEY([Role_id])
REFERENCES [dbo].[Roles] ([role_id])
GO
/****** Object:  StoredProcedure [dbo].[GetRoles]    Script Date: 16-05-2024 17:02:34 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[GetRoles]
AS
BEGIN
    -- Select all roles from the Roles table
    SELECT *
    FROM Roles;
END
GO
/****** Object:  StoredProcedure [dbo].[sp_Project]    Script Date: 16-05-2024 17:02:34 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[sp_Project]
    @projectId INT = NULL,
    @projectName NVARCHAR(255) = NULL,
    @projectDetails NVARCHAR(MAX) = NULL,
    @action NVARCHAR(50) 
AS
BEGIN
    SET NOCOUNT ON;

    IF @action = 'insert'
    BEGIN
        INSERT INTO Projects (ProjectName, ProjectDetails)
        VALUES (@projectName, @projectDetails);
    END
    ELSE IF @action = 'update'
    BEGIN
        UPDATE Projects
        SET ProjectName = @projectName,
            ProjectDetails = @projectDetails
        WHERE ProjectId = @projectId;
    END
    ELSE IF @action = 'delete'
    BEGIN
        DELETE FROM Projects
        WHERE ProjectId = @projectId;
    END
    ELSE IF @action = 'get'
    BEGIN
        SELECT ProjectId, ProjectName, ProjectDetails
        FROM Projects;
    END

    ELSE IF @action = 'GetAllTeamMembers'
    BEGIN
        SELECT U.User_id, U.Username, U.Email, U.Role_id
        FROM Users U
        WHERE U.Role_id = 3; 
    END
END;
GO
/****** Object:  StoredProcedure [dbo].[sp_Task_Delete]    Script Date: 16-05-2024 17:02:34 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[sp_Task_Delete]
    @taskId INT
AS
BEGIN
    SET NOCOUNT ON;

    DELETE FROM Tasks
    WHERE TaskID = @taskId;
END;
GO
/****** Object:  StoredProcedure [dbo].[sp_Task_GetAll]    Script Date: 16-05-2024 17:02:34 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[sp_Task_GetAll]
AS
BEGIN
    SET NOCOUNT ON;

    SELECT TaskID, TaskName, TaskDescription, TaskType, Status, ProjectId, StartDate, DueDate
    FROM Tasks;
END;
GO
/****** Object:  StoredProcedure [dbo].[sp_Task_Insert]    Script Date: 16-05-2024 17:02:34 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[sp_Task_Insert]
    @taskName NVARCHAR(255),
    @taskDescription NVARCHAR(MAX),
    @taskType NVARCHAR(50),
    @status NVARCHAR(50),
    @projectName NVARCHAR(255),
    @startDate DATETIME,
    @dueDate DATETIME
AS
BEGIN
    SET NOCOUNT ON;

    INSERT INTO Tasks (TaskName, TaskDescription, TaskType, Status, ProjectId, StartDate, DueDate)
    VALUES (@taskName, @taskDescription, @taskType, @status, @projectName, @startDate, @dueDate);
END;
GO
/****** Object:  StoredProcedure [dbo].[sp_Task_Update]    Script Date: 16-05-2024 17:02:34 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[sp_Task_Update]
    @taskId INT,
    @taskName NVARCHAR(255),
    @taskDescription NVARCHAR(MAX),
    @taskType NVARCHAR(50),
    @status NVARCHAR(50),
    @projectName NVARCHAR(255),
    @startDate DATETIME,
    @dueDate DATETIME
AS
BEGIN
    SET NOCOUNT ON;

    UPDATE Tasks
    SET TaskName = @taskName,
        TaskDescription = @taskDescription,
        TaskType = @taskType,
        Status = @status,
        ProjectId = @projectName,
        StartDate = @startDate,
        DueDate = @dueDate
    WHERE TaskID = @taskId;
END;
GO
/****** Object:  StoredProcedure [dbo].[sp_User]    Script Date: 16-05-2024 17:02:34 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[sp_User]
    @user_id INT = NULL,
    @username NVARCHAR(100) = NULL,
    @email NVARCHAR(100) = NULL,
    @password_hash NVARCHAR(255) = NULL,
    @role NVARCHAR(50) = NULL,
    @action NVARCHAR(10)
AS
BEGIN
    SET NOCOUNT ON;

    IF @action = 'insert'
    BEGIN
        INSERT INTO Users (Username, Email, PasswordHash, Role_id)
        VALUES (@username, @email, @password_hash, @role);
    END
    ELSE IF @action = 'update'
    BEGIN
        UPDATE Users
        SET Username = @username,
            Email = @email,
            PasswordHash = @password_hash,
            Role_id = @role
        WHERE User_id = @user_id;
    END
    ELSE IF @action = 'delete'
    BEGIN
        DELETE FROM Users
        WHERE User_id = @user_id;
    END
    ELSE IF @action = 'get'
    BEGIN
     SELECT u.User_id, u.Username, u.Email, u.PasswordHash, u.Role_id, r.role_name
FROM Users u
JOIN Roles r ON u.Role_id = r.role_id;

    END
    ELSE IF @action = 'loginuser'
    BEGIN
        SELECT User_id, Username, Email, PasswordHash, Role_id
        FROM Users
        WHERE Username = @username AND PasswordHash = @password_hash;
    END
END;
GO
USE [master]
GO
ALTER DATABASE [TASK_MANAGEMENT] SET  READ_WRITE 
GO
