using API.Models;
using System.Collections.Generic;

namespace API.Repositories.Interfaces
{
    public interface IProjectRepository
    {
        bool AddProject(Project project);

        IEnumerable<Project> GetAllProjects();
      

         bool UpdateProject(Project project);

        bool DeleteProject(Project project);
    }
}
