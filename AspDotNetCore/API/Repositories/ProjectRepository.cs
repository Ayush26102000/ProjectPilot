using API.Models;
using API.Repositories.Interfaces;
using Dapper;
using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;
using System.Collections.Generic;
using System.Data;

public class ProjectRepository : IProjectRepository
{
    private readonly string _connectionString;

    public ProjectRepository(IConfiguration configuration)
    {
        _connectionString = configuration.GetConnectionString("DefaultConnection");
    }

    public bool AddProject(Project project)
    {
        using IDbConnection db = new SqlConnection(_connectionString);
        var parameters = new
        {
            projectName = project.ProjectName,
            projectDetails = project.Description,
            action = "insert"
        };
        var affectedRows = db.Execute("sp_InsertProjectMaster", parameters, commandType: CommandType.StoredProcedure);
        return affectedRows > 0;
    }

    public bool UpdateProject(Project project)
    {
        using IDbConnection db = new SqlConnection(_connectionString);
        var parameters = new
        {
            projectId = project.ProjectID,
            projectName = project.ProjectName,
            projectDetails = project.Description,
            action = "update"
        };
        var affectedRows = db.Execute("sp_UpdateProjectMaster", parameters, commandType: CommandType.StoredProcedure);
        return affectedRows > 0;
    }

    public bool DeleteProject(Project project)
    {
        using IDbConnection db = new SqlConnection(_connectionString);
        var parameters = new
        {
            projectId = project.ProjectID,
            action = "delete"
        };
        var affectedRows = db.Execute("sp_DeleteProjectMaster", parameters, commandType: CommandType.StoredProcedure);
        return affectedRows > 0;
    }

    public IEnumerable<Project> GetAllProjects()
    {
        using IDbConnection db = new SqlConnection(_connectionString);
        var projects = db.Query<Project>("sp_GetProjectMaster", commandType: CommandType.StoredProcedure);
        return projects;
    }

  
    
}
