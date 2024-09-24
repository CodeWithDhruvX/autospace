import { ArgsType, Field, registerEnumType, PartialType } from '@nestjs/graphql'
import { Prisma } from '@prisma/client'
import { UsernpxOrderByWithRelationInput } from './order-by.args'
import { UsernpxWhereInput, UsernpxWhereUniqueInput } from './where.args'
import { RestrictProperties } from 'src/common/dtos/common.input'

registerEnumType(Prisma.UsernpxScalarFieldEnum, {
  name: 'UsernpxScalarFieldEnum',
})

@ArgsType()
class FindManyUsernpxArgsStrict
  implements RestrictProperties<FindManyUsernpxArgsStrict, Omit<Prisma.UsernpxFindManyArgs, 'include' | 'select'>>
{
  where: UsernpxWhereInput
  orderBy: UsernpxOrderByWithRelationInput[]
  cursor: UsernpxWhereUniqueInput
  take: number
  skip: number
  @Field(() => [Prisma.UsernpxScalarFieldEnum])
  distinct: Prisma.UsernpxScalarFieldEnum[]
}

@ArgsType()
export class FindManyUsernpxArgs extends PartialType(
  FindManyUsernpxArgsStrict,
) {}

@ArgsType()
export class FindUniqueUsernpxArgs {
  where: UsernpxWhereUniqueInput
}