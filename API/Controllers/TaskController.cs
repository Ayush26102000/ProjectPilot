using API.Models;
using API.Repositories.Interfaces;
using Microsoft.AspNetCore.Mvc;
using Task = API.Models.Task;

namespace API.Controllers
{
    [Route("api/[controller]")]
    public class TaskController : Controller
    {
        private readonly ITaskRepository _taskRepository;

        public TaskController(ITaskRepository taskRepository)
        {
            _taskRepository = taskRepository;
        }

        [HttpGet]
        public IActionResult GetAllTasks()
        {
            var tasks = _taskRepository.GetAllTasks();
            return Ok(tasks);
        }

        [HttpPost]
        [Route("AddTask")]
        public IActionResult AddTask([FromBody] Task task)
        {
            var result = _taskRepository.AddTask(task);
            return Ok(result);
        }

        [HttpPost]
        [Route("UpdateTask")]
        public IActionResult UpdateTask([FromBody] Task task)
        {
            var result = _taskRepository.UpdateTask(task);
            return Ok(result);
        }

        [HttpPost]
        [Route("DeleteTask")]
        public IActionResult DeleteTask([FromBody] Task task)
        {
            var result = _taskRepository.DeleteTask(task);
            return Ok(result);
        }
    }
}
