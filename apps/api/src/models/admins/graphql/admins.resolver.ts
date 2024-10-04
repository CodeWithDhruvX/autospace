import { Resolver, Query, Mutation, Args, Parent, ResolveField } from '@nestjs/graphql'
import { AdminsService } from './admins.service'
import { Admin } from './entity/admin.entity'
import { FindManyAdminArgs, FindUniqueAdminArgs } from './dtos/find.args'
import { CreateAdminInput } from './dtos/create-admin.input'
import { UpdateAdminInput } from './dtos/update-admin.input'
import { checkRowLevelPermission } from 'src/common/auth/util'
import { GetUserType } from 'src/common/types'
import { AllowAuthenticated, GetUser } from 'src/common/auth/auth.decorator'
import { PrismaService } from 'src/common/prisma/prisma.service'
import { Customer } from '@prisma/client'
import { User } from 'src/models/users/graphql/entity/user.entity'
import { Verification } from 'src/models/verifications/graphql/entity/verification.entity'

@Resolver(() => Admin)
export class AdminsResolver {
  constructor(
    private readonly adminsService: AdminsService,
    private readonly prisma: PrismaService,
  ) {}

  @AllowAuthenticated('admin')
  @Mutation(() => Admin)
  createAdmin(
    @Args('createAdminInput') args: CreateAdminInput,
    @GetUser() user: GetUserType,
  ) {
    checkRowLevelPermission(user, args.uid)
    return this.adminsService.create(args)
  }

  @Query(() => [Admin], { name: 'admins' })
  findAll(@Args() args: FindManyAdminArgs) {
    return this.adminsService.findAll(args)
  }

  @Query(() => Admin, { name: 'admin' })
  findOne(@Args() args: FindUniqueAdminArgs) {
    return this.adminsService.findOne(args)
  }

  @AllowAuthenticated()
  @Mutation(() => Admin)
  async updateAdmin(
    @Args('updateAdminInput') args: UpdateAdminInput,
    @GetUser() user: GetUserType,
  ) {
    const admin = await this.prisma.admin.findUnique({
      where: { uid: args.uid },
    })
    checkRowLevelPermission(user, admin.uid)
    return this.adminsService.update(args)
  }

  @AllowAuthenticated()
  @Mutation(() => Admin)
  async removeAdmin(
    @Args() args: FindUniqueAdminArgs,
    @GetUser() user: GetUserType,
  ) {
    const admin = await this.prisma.admin.findUnique(args)
    checkRowLevelPermission(user, admin.uid)
    return this.adminsService.remove(args)
  }

  @ResolveField(()=>User,{nullable:true})
  customer(@Parent() customer:Customer){
    return this.prisma.user.findUnique({where:{uid:customer.uid}})
  }

  @ResolveField(()=>Verification,{nullable:true})
  verfications(@Parent() verfications:Verification){
    return this.prisma.verification.findMany({where:{adminId:verfications.adminId}})
  }

  @ResolveField(()=>Number)
  async verficationsCount(@Parent() parent:Admin){
    return this.prisma.verification.count({where:{adminId:parent.uid}})
  }

  
}
