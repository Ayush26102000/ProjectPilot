using API.Models;
using API.Repositories.Interfaces;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProjectController : Controller
    {
        private readonly IProjectRepository _projectRepository;

        public ProjectController(IProjectRepository projectRepository)
        {
            _projectRepository = projectRepository;
        }

        [HttpGet]
        public IActionResult GetAllProjects()
        {
            var projects = _projectRepository.GetAllProjects();
            return Ok(projects);
        }

        [HttpGet]
        [Route("GetAllTeamMembers")]
        public IActionResult GetAllTeamMembers()
        {
            var users = _projectRepository.GetAllTeamMembers();
            return Ok(users);
        }

        [HttpPost]
        [Route("AddProject")]
        public IActionResult AddProject([FromBody] Project project)
        {
            _projectRepository.AddProject(project);
            return Ok();
        }

        [HttpPost]
        [Route("UpdateProject")]
        public IActionResult UpdateProject([FromBody] Project project)
        {
            _projectRepository.UpdateProject(project);
            return Ok();
        }

        [HttpPost]
        [Route("DeleteProject")]
        public IActionResult DeleteProject([FromBody] Project project)
        {
           _projectRepository.DeleteProject(project);
            return Ok();
        }
    }
}
