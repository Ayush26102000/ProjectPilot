using API.Models;
using API.Repositories.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Route("api/[controller]")]
    public class UserController : Controller
    {
        private readonly IUserRepository _userRepository;

        public UserController(IUserRepository userRepository)
        {
            _userRepository = userRepository;
        }

        [HttpGet]
        public IActionResult GetAllUsers()
        {
            var users = _userRepository.GetAllUsers();
            return Ok(users);
        }
        
        [HttpGet]
        [Route("GetRoles")]
        public IActionResult GetRoles()
        {
            var roles = _userRepository.GetRoles();
            return Ok(roles);
        }

        [HttpPost]
        [Route("AddUser")]
        public IActionResult AddUser([FromBody] User user)
        {
            var result = _userRepository.AddUser(user);
            return Ok(result);
        }

         [HttpPost]
        [Route("UpdateUser")]
        public IActionResult UpdateUser([FromBody] User user)
        {
            var result = _userRepository.UpdateUser(user);
            return Ok(result);
        } 
        
        [HttpPost]
        [Route("DeleteUser")]
        public IActionResult DeleteUser([FromBody] User user)
        {
            var result = _userRepository.DeleteUser(user);
            return Ok(result);
        }

        [HttpPost]
        [Route("LoginUser")]
        public IActionResult LoginUser([FromBody] User user)
        {
            var result = _userRepository.LoginUser(user.Username, user.PasswordHash);
            return Ok(result);
        }
    }
}
