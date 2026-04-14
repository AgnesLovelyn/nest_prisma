import { ApiProperty } from '@nestjs/swagger';

export class CreatePeminjamanBukuDto {
  @ApiProperty()
  nis: string;
  
  @ApiProperty()
  bookId: number;
}