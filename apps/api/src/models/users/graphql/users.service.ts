import { Injectable } from '@nestjs/common'
import { PrismaService } from 'src/common/prisma/prisma.service'
import { FindManyUserArgs, FindUniqueUserArgs } from './dtos/find.args'
import { UpdateUserInput } from './dtos/update-user.input'
import {
  RegisterWithCredentialsInput,
  RegisterWithProviderInput,
} from './dtos/create-user.input'

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  registerWithProvider({ image, name, uid, type }: RegisterWithProviderInput) {
    return this.prisma.user.create({
      data: {
        uid,
        image,
        name,
        AuthProvider: {
          create: {
            type,
          },
        },
      },
    })
  }

  registerWithCredentials({
    email,
    name,
    password,
    image,
  }: RegisterWithCredentialsInput) {}

  findAll(args: FindManyUserArgs) {
    return this.prisma.user.findMany(args)
  }

  findOne(args: FindUniqueUserArgs) {
    return this.prisma.user.findUnique(args)
  }

  update(updateUserInput: UpdateUserInput) {
    const { uid, ...data } = updateUserInput
    return this.prisma.user.update({
      where: { uid },
      data: data,
    })
  }

  remove(args: FindUniqueUserArgs) {
    return this.prisma.user.delete(args)
  }
}
