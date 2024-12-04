package vadmark.afp.temp

import org.mapstruct.Mapper
import org.mapstruct.factory.Mappers

@Mapper(componentModel = "spring")
interface UserMapper {
//    companion object {
//        val INSTANCE: UserMapper = Mappers.getMapper(UserMapper::class.java)
//    }

    fun toDto(user: User): UserDTO
    fun toEntity(userDto: UserDTO): User
}
