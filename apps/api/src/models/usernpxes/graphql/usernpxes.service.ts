import { Injectable } from '@nestjs/common'
import { FindManyUsernpxArgs, FindUniqueUsernpxArgs } from './dtos/find.args'
import { PrismaService } from 'src/common/prisma/prisma.service'
import { CreateUsernpxInput } from './dtos/create-usernpx.input'
import { UpdateUsernpxInput } from './dtos/update-usernpx.input'

@Injectable()
export class UsernpxesService {
  constructor(private readonly prisma: PrismaService) {}
  create(createUsernpxInput: CreateUsernpxInput) {
    return this.prisma.usernpx.create({
      data: createUsernpxInput,
    })
  }

  findAll(args: FindManyUsernpxArgs) {
    return this.prisma.usernpx.findMany(args)
  }

  findOne(args: FindUniqueUsernpxArgs) {
    return this.prisma.usernpx.findUnique(args)
  }

  update(updateUsernpxInput: UpdateUsernpxInput) {
    const { id, ...data } = updateUsernpxInput
    return this.prisma.usernpx.update({
      where: { id },
      data: data,
    })
  }

  remove(args: FindUniqueUsernpxArgs) {
    return this.prisma.usernpx.delete(args)
  }
}
