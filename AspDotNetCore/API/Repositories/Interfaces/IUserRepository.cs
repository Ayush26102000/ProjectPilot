using API.Models;

namespace API.Repositories.Interfaces
{
    public interface IUserRepository
    {
        bool AddUser(User user);
     
        IEnumerable<User> GetAllUsers ();

        bool UpdateUser(User user);  
        bool DeleteUser(User user);

        IEnumerable<User> LoginUser(String Username, String Password);

        IEnumerable<Role> GetRoles ();

    }
}
