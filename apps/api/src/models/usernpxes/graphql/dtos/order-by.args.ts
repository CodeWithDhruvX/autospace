import { Field, InputType, PartialType } from '@nestjs/graphql'
import { Prisma } from '@prisma/client'
import { RestrictProperties } from 'src/common/dtos/common.input'

@InputType()
export class UsernpxOrderByWithRelationInputStrict
  implements RestrictProperties<UsernpxOrderByWithRelationInputStrict, Prisma.UsernpxOrderByWithRelationInput>
{
  // Todo: Add below field decorator to the SortOrder properties.
  // @Field(() => Prisma.SortOrder)
}


@InputType()
export class UsernpxOrderByWithRelationInput extends PartialType(
  UsernpxOrderByWithRelationInputStrict,
) {}

@InputType()
export class UsernpxOrderByRelationAggregateInput {
  @Field(() => Prisma.SortOrder)
  _count?: Prisma.SortOrder
}
