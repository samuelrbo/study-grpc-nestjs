import {
  LoginRequestDto,
  RegisterRequestDto,
  ValidateRequestDto,
} from './auth.dto';
import { Controller, Inject } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import {
  AUTH_SERVICE_NAME,
  LoginResponse,
  RegisterResponse,
  ValidateResponse,
} from './auth.pb';
import { AuthService } from './service/auth.service';

@Controller()
export class AuthController {
  constructor(
    @Inject(AuthService)
    private readonly service: AuthService,
  ) {}

  @GrpcMethod(AUTH_SERVICE_NAME, 'Register')
  public register(payload: RegisterRequestDto): Promise<RegisterResponse> {
    return this.service.register(payload);
  }

  @GrpcMethod(AUTH_SERVICE_NAME, 'Login')
  public login(payload: LoginRequestDto): Promise<LoginResponse> {
    return this.service.login(payload);
  }

  @GrpcMethod(AUTH_SERVICE_NAME, 'Validate')
  public validate(payload: ValidateRequestDto): Promise<ValidateResponse> {
    return this.service.validate(payload);
  }
}