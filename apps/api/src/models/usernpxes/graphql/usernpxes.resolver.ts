import { Resolver, Query, Mutation, Args } from '@nestjs/graphql'
import { UsernpxesService } from './usernpxes.service'
import { Usernpx } from './entity/usernpx.entity'
import { FindManyUsernpxArgs, FindUniqueUsernpxArgs } from './dtos/find.args'
import { CreateUsernpxInput } from './dtos/create-usernpx.input'
import { UpdateUsernpxInput } from './dtos/update-usernpx.input'
import { checkRowLevelPermission } from 'src/common/auth/util'
import { GetUserType } from 'src/common/types'
import { AllowAuthenticated, GetUser } from 'src/common/auth/auth.decorator'
import { PrismaService } from 'src/common/prisma/prisma.service'

@Resolver(() => Usernpx)
export class UsernpxesResolver {
  constructor(private readonly usernpxesService: UsernpxesService,
    private readonly prisma: PrismaService) {}

  @AllowAuthenticated()
  @Mutation(() => Usernpx)
  createUsernpx(@Args('createUsernpxInput') args: CreateUsernpxInput, @GetUser() user: GetUserType) {
    checkRowLevelPermission(user, args.uid)
    return this.usernpxesService.create(args)
  }

  @Query(() => [Usernpx], { name: 'usernpxes' })
  findAll(@Args() args: FindManyUsernpxArgs) {
    return this.usernpxesService.findAll(args)
  }

  @Query(() => Usernpx, { name: 'usernpx' })
  findOne(@Args() args: FindUniqueUsernpxArgs) {
    return this.usernpxesService.findOne(args)
  }

  @AllowAuthenticated()
  @Mutation(() => Usernpx)
  async updateUsernpx(@Args('updateUsernpxInput') args: UpdateUsernpxInput, @GetUser() user: GetUserType) {
    const usernpx = await this.prisma.usernpx.findUnique({ where: { id: args.id } })
    checkRowLevelPermission(user, usernpx.uid)
    return this.usernpxesService.update(args)
  }

  @AllowAuthenticated()
  @Mutation(() => Usernpx)
  async removeUsernpx(@Args() args: FindUniqueUsernpxArgs, @GetUser() user: GetUserType) {
    const usernpx = await this.prisma.usernpx.findUnique(args)
    checkRowLevelPermission(user, usernpx.uid)
    return this.usernpxesService.remove(args)
  }
}
