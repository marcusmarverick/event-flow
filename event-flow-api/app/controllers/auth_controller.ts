import type { HttpContext } from '@adonisjs/core/http'
import { inject } from '@adonisjs/core'
import RegisterUserUseCase from '#use_cases/auth/register_user_use_case'
import LoginUserUseCase from '#use_cases/auth/login_user_use_case'
import { registerUserValidator, loginUserValidator } from '#validators/auth_validator'

@inject()
export default class AuthController {
  constructor(
    private registerUserUseCase: RegisterUserUseCase,
    private loginUserUseCase: LoginUserUseCase
  ) {}

  async register({ request, response }: HttpContext) {
    const dto = await request.validateUsing(registerUserValidator)
    const { user, token } = await this.registerUserUseCase.execute(dto)
    return response.created({ user, token })
  }

  async login({ request, response }: HttpContext) {
    const dto = await request.validateUsing(loginUserValidator)
    const { user, token } = await this.loginUserUseCase.execute(dto)
    return response.ok({ user, token })
  }
}
