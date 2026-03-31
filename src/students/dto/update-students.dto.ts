import {UserRole} from '@prisma/client'
export class UpdateStudentDto {
  nis?: string;
  name?: string;
  password?: string;
  email?: string;
  kelas?: string;
  jurusan?: string;
  role: UserRole;
}

  
  