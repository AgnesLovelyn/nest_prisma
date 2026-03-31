import {UserRole} from '@prisma/client'
export class CreateStudentDto {
  nis: string;
  name: string;
  password: string;
  email?: string;
  kelas: string;
  jurusan: string;
  role: UserRole;
}
