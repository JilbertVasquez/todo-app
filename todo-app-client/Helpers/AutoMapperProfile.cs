using AutoMapper;
using todo_app_client.Api.Data.Dtos.UserDtos;
using todo_app_client.Api.Models;

namespace todo_app_client.Helpers;

public class AutoMapperProfile: Profile
{
    public AutoMapperProfile()
    {
        MapUsers();
    }

    private void MapUsers()
    {
        CreateMap<User, UserDetailsDto>();
    }
}