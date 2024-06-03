import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
import { User } from '../user/entities/user.entity';
import { SignInDto, SignUpDto } from 'src/common/dtos/auth.dto';
import { GetUser } from 'src/common/decorators/get-user.decorator';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @Post('/signup')
    async signUp(@Body() signUpDto: SignUpDto): Promise<void> {
        return this.authService.signUp(signUpDto);
    }

    @Post('/signin')
    async signIn(@Body() signInDto: SignInDto): Promise<{ accessToken: string }> {
        return this.authService.signIn(signInDto);
    }

    @Post('/signout')
    async signOut(): Promise<void> {
        return this.authService.signOut();
    }

    @Post('/current-user')
    @UseGuards(AuthGuard())
    async getCurrentUser(@GetUser() user: User): Promise<User> {
        return this.authService.getCurrentUser(user.username);
    }
}
