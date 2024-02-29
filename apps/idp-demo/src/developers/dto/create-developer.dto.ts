import { ApiProperty } from '@nestjs/swagger';

export class CreateDeveloperDto {
  @ApiProperty({
    description: 'The name of the developer',
    type: String,
    example: 'John Doe',
  })
  name: string;

  @ApiProperty({
    description: 'The email of the developer',
    type: String,
    example: 'jdoe@example.com',
  })
  email: string;
}
