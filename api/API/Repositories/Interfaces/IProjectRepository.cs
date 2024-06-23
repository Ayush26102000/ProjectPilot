using API.Models;
using System.Collections.Generic;

namespace API.Repositories.Interfaces
{
    public interface IProjectRepository
    {
        void AddProject(Project project);

        IEnumerable<Project> GetAllProjects();
        IEnumerable<User> GetAllTeamMembers();

         void UpdateProject(Project project);

        void DeleteProject(Project project);
    }
}
