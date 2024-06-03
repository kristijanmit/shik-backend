import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { SignInDto, SignUpDto } from 'src/common/dtos/auth.dto';
import { User } from '../user/entities/user.entity';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
        private readonly jwtService: JwtService,
    ) { }

    async signUp(signUpDto: SignUpDto): Promise<void> {
        const { username, password } = signUpDto;

        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(password, salt);

        const user = this.userRepository.create({
            username,
            password: hashedPassword,
        });

        await this.userRepository.save(user);
    }

    async signIn(signInDto: SignInDto): Promise<{ accessToken: string }> {
        const { username, password } = signInDto;
        const user = await this.userRepository.findOne({ where: { username } });

        if (user && (await bcrypt.compare(password, user.password))) {
            const payload = { username };
            const accessToken = await this.jwtService.sign(payload);
            return { accessToken };
        } else {
            throw new UnauthorizedException('Please check your login credentials');
        }
    }

    async signOut(): Promise<void> {
        // Implement sign out logic if needed
    }

    async getCurrentUser(username: string): Promise<User> {
        return this.userRepository.findOne({ where: { username } });
    }
}
