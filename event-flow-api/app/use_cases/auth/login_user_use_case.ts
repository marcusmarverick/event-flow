import { Exception } from '@adonisjs/core/exceptions'
import { inject } from '@adonisjs/core'
import User from '#models/user'
import UserRepository from '#repositories/user_repository'
import type { LoginUserDto } from '#dtos/auth_dto'

@inject()
export default class LoginUserUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute(dto: LoginUserDto): Promise<{ user: User; token: { value: string } }> {
    const user = await this.userRepository.verifyCredentials(dto.email, dto.password).catch(() => {
      throw new Exception('Credenciais inválidas', { status: 401, code: 'E_INVALID_CREDENTIALS' })
    })

    const token = await this.userRepository.createToken(user)

    return { user, token }
  }
}
