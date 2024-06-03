import { IsString, MinLength, MaxLength, Matches } from 'class-validator';

export class SignUpDto {
    @IsString()
    @MinLength(4)
    @MaxLength(20)
    username: string;

    @IsString()
    @MinLength(8)
    @MaxLength(20)
    @Matches(
        /((?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W).{8,40})/,
        { message: 'Password is too weak' },
    )
    password: string;
}

export class SignInDto {
    @IsString()
    username: string;

    @IsString()
    password: string;
}
