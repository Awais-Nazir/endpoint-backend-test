import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignupDto } from './dto/signup.dto';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('signup')
    signup(@Body() signupdto:SignupDto){
        return this.authService.signup(signupdto)
    }

    @Post('login')
    login(@Body() logindto: LoginDto){
        return this.authService.login(logindto)
    }
}
