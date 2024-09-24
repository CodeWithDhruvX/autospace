import { Field, InputType, PartialType } from '@nestjs/graphql'
import { Prisma } from '@prisma/client'
import { RestrictProperties } from 'src/common/dtos/common.input'

@InputType()
export class UsernpxWhereUniqueInput {
  id: number
}

@InputType()
export class UsernpxWhereInputStrict implements RestrictProperties<UsernpxWhereInputStrict, Prisma.UsernpxWhereInput> {
  // Todo: Add the below field decorator only to the $Enums types.
  // @Field(() => $Enums.x)

  AND: UsernpxWhereInput[]
  OR: UsernpxWhereInput[]
  NOT: UsernpxWhereInput[]
}

@InputType()
export class UsernpxWhereInput extends PartialType(
  UsernpxWhereInputStrict,
) {}

@InputType()
export class UsernpxListRelationFilter {
  every?: UsernpxWhereInput
  some?: UsernpxWhereInput
  none?: UsernpxWhereInput
}

@InputType()
export class UsernpxRelationFilter {
  is?: UsernpxWhereInput
  isNot?: UsernpxWhereInput
}
