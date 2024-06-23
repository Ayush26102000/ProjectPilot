using API.Models;
using API.Repositories.Interfaces;
using System.Data;

using Dapper;
using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;
using System.Security.Cryptography;
using System.Text;

public class UserRepository : IUserRepository
{

    private readonly string connectionString;

    private readonly IConfiguration configuration;

    public UserRepository(IConfiguration configuration)
    {
        connectionString = configuration.GetConnectionString("DefaultConnection");
    }



    public bool AddUser(User user)
    {
        using IDbConnection db = new SqlConnection(connectionString);
        var parameters = new
        {
            username = user.Username,
            email = user.Email,
            password_hash = user.PasswordHash,
            role = user.RoleID,
            action = "insert"
        };
        var affectedRows = db.Execute("sp_InsertUserMaster", parameters, commandType: CommandType.StoredProcedure);
        if (affectedRows < 1)
        {
            return false;
        }
        else
        {
            return true;
        }
    }
    
    
    public bool LoginUser(String Username , String Password)
    {
       // string decryptedPasswordHash = DecryptPassword(Password);

        using IDbConnection db = new SqlConnection(connectionString);
        var parameters = new
        {
            username = Username,
            password_hash = Password,
            action = "loginuser"
        };
        var users = db.Query<User>("sp_User", parameters, commandType: CommandType.StoredProcedure);
        if(users.Count() > 0)
        {
            return true;
        }
        else
        {
            return false;
        }
    }

    public bool DeleteUser(User user)
    {
        using IDbConnection db = new SqlConnection(connectionString);
        var parameters = new
        {
            user_id = user.UserID,
            username = user.Username,
            email = user.Email,
            password_hash = user.PasswordHash,
            role = user.RoleID,
            action = "delete"
        };
        var affectedRows = db.Execute("sp_DeleteUserMaster", parameters, commandType: CommandType.StoredProcedure);
        if (affectedRows < 1)
        {
            return false;
        }
        else
        {
            return true;
        }
    }

    public IEnumerable<User> GetAllUsers()
    {
       
        using IDbConnection db = new SqlConnection(connectionString);
        var roles = db.Query<User>("sp_GetUserMaster",  commandType: CommandType.StoredProcedure);
        return roles;
    }

    public IEnumerable<Role> GetRoles()
    {
        using IDbConnection db = new SqlConnection(connectionString);
        var roles = db.Query<Role>("sp_GetRoleMaster", commandType: CommandType.StoredProcedure);
        return roles;
    }


    public bool UpdateUser(User user)
    {
        using IDbConnection db = new SqlConnection(connectionString);
        var parameters = new
        {
            user_id = user.UserID,
            username = user.Username,
            email = user.Email,
            password_hash = user.PasswordHash,
            role = user.RoleID,
            action = "update"
        };
        var affectedRows = db.Execute("sp_UpdateUserMaster", parameters, commandType: CommandType.StoredProcedure);
        if (affectedRows < 1)
        {
            return false;
        }
        else
        {
            return true;
        }
    }


    private string DecryptPassword(string encryptedPassword)
    {

        byte[] encryptedBytes = Convert.FromBase64String(encryptedPassword);
        byte[] decryptedBytes;

        using (Aes aesAlg = Aes.Create())
        {
            aesAlg.Key = Encoding.UTF8.GetBytes("B@|@j!");
            aesAlg.IV = new byte[16]; 

            ICryptoTransform decryptor = aesAlg.CreateDecryptor(aesAlg.Key, aesAlg.IV);

            using (MemoryStream msDecrypt = new MemoryStream(encryptedBytes))
            {
                using (CryptoStream csDecrypt = new CryptoStream(msDecrypt, decryptor, CryptoStreamMode.Read))
                {
                    using (StreamReader srDecrypt = new StreamReader(csDecrypt))
                    {
                        string decryptedPassword = srDecrypt.ReadToEnd();
                        return decryptedPassword;
                    }
                }
            }
        }
    }


}
