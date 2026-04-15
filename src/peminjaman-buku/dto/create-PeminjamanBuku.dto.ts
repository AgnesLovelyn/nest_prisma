import { ApiProperty } from '@nestjs/swagger';

export class CreatePeminjamanBukuDto {
  @ApiProperty()
  nis: string;

  @ApiProperty()
  Id_book: number;
}
