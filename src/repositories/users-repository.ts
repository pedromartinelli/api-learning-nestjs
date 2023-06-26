import { User } from "@prisma/client";

export abstract class UsersRepository {
  abstract create(first_name: string, last_name: string, email: string, password: string): Promise<void>
  abstract findByEmail(email: string): Promise<User | null>;
  abstract findById(id: string): Promise<User | null>;
  abstract findById(id: string): Promise<Pick<User, 'first_name' | 'last_name' | 'email'> | null[]>;
  abstract findAll(): Promise<Pick<User, 'first_name' | 'last_name' | 'email'>[]>;
  abstract findAll(): Promise<User[]>
  abstract update(id: string, userData: Partial<User>): Promise<User>
}