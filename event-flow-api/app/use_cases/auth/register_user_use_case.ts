import { Exception } from '@adonisjs/core/exceptions'
import { inject } from '@adonisjs/core'
import User from '#models/user'
import UserRepository from '#repositories/user_repository'
import type { RegisterUserDto } from '#dtos/auth_dto'

@inject()
export default class RegisterUserUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute(dto: RegisterUserDto): Promise<{ user: User; token: { value: string } }> {
    if (dto.type === 'participant' && !dto.cpf) {
      throw new Exception('CPF é obrigatório para participantes', {
        status: 422,
        code: 'E_CPF_REQUIRED',
      })
    }

    const existingEmail = await this.userRepository.findByEmail(dto.email)
    if (existingEmail) {
      throw new Exception('E-mail já está em uso', { status: 409, code: 'E_EMAIL_TAKEN' })
    }

    if (dto.cpf) {
      const existingCpf = await this.userRepository.findByCpf(dto.cpf)
      if (existingCpf) {
        throw new Exception('CPF já está em uso', { status: 409, code: 'E_CPF_TAKEN' })
      }
    }

    const user = await this.userRepository.create(dto)
    const token = await this.userRepository.createToken(user)

    return { user, token }
  }
}
