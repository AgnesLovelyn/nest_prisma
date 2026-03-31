import { IsNotEmpty, IsString } from 'class-validator';

export class LoginDto {
  @IsString()
  @IsNotEmpty()
  nis: string;
  

  @IsString()
  @IsNotEmpty()
  password: string;
}
