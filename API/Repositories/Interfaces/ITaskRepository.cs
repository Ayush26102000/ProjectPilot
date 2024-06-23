using API.Models;
using System.Collections.Generic;
using Task = API.Models.Task;


namespace API.Repositories.Interfaces
{
    public interface ITaskRepository
    {
        bool AddTask(Task task);
        IEnumerable<Task> GetAllTasks();
        bool UpdateTask(Task task);
        bool DeleteTask(Task task);
    }
}
