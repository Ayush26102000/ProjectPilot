using API.Models;
using API.Repositories.Interfaces;
using Dapper;
using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;
using System.Collections.Generic;
using System.Data;
using Task = API.Models.Task;

public class TaskRepository : ITaskRepository
{
    private readonly string connectionString;

    public TaskRepository(IConfiguration configuration)
    {
        connectionString = configuration.GetConnectionString("DefaultConnection");
    }

    public bool AddTask(Task task)
    {
        using IDbConnection db = new SqlConnection(connectionString);
        var parameters = new
        {
            taskName = task.TaskName,
            taskDescription = task.TaskDescription,
            taskType = task.TaskType,
            status = task.Status,
            projectName = task.ProjectName,
            startDate = task.StartDate,
            dueDate = task.DueDate
        };
        var affectedRows = db.Execute("sp_Task_Insert", parameters, commandType: CommandType.StoredProcedure);
        return affectedRows > 0;
    }

    public bool DeleteTask(Task task)
    {
        using IDbConnection db = new SqlConnection(connectionString);
        var parameters = new
        {
            taskId = task.TaskID
        };
        var affectedRows = db.Execute("sp_Task_Delete", parameters, commandType: CommandType.StoredProcedure);
        return affectedRows > 0;
    }

    public IEnumerable<Task> GetAllTasks()
    {
        using IDbConnection db = new SqlConnection(connectionString);
        return db.Query<Task>("sp_Task_GetAll", commandType: CommandType.StoredProcedure);
    }

    public bool UpdateTask(Task task)
    {
        using IDbConnection db = new SqlConnection(connectionString);
        var parameters = new
        {
            taskId = task.TaskID,
            taskName = task.TaskName,
            taskDescription = task.TaskDescription,
            taskType = task.TaskType,
            status = task.Status,
            projectName = task.ProjectName,
            startDate = task.StartDate,
            dueDate = task.DueDate
        };
        var affectedRows = db.Execute("sp_Task_Update", parameters, commandType: CommandType.StoredProcedure);
        return affectedRows > 0;
    }
}
