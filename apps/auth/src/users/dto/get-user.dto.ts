import { IsAlphanumeric, IsEmail, IsString, IsUUID } from 'class-validator';

export class GetUserDto {
  @IsUUID()
  @IsString()
  id?: string;

  @IsEmail()
  email?: string;

  @IsAlphanumeric()
  name?: string;
}
