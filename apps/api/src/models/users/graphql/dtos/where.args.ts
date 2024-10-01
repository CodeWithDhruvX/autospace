import { InputType, PartialType } from '@nestjs/graphql'
import { Prisma } from '@prisma/client'
import {
  DateTimeFilter,
  RestrictProperties,
  StringFilter,
} from 'src/common/dtos/common.input'
import { CustomerRelationFilter } from 'src/models/customers/graphql/dtos/where.args'
import { ManagerRelationFilter } from 'src/models/managers/graphql/dtos/where.args'
import { ValetRelationFilter } from 'src/models/valets/graphql/dtos/where.args'

@InputType()
export class UserWhereUniqueInput {
  uid: string
}

@InputType()
export class UserWhereInputStrict
  implements
    RestrictProperties<
      UserWhereInputStrict,
      Omit<
        Prisma.UserWhereInput,
        'Credentials' | 'AuthProvider' | 'Admin' | 'image'
      >
    >
{
  Customer: CustomerRelationFilter
  Manager: ManagerRelationFilter
  Valet: ValetRelationFilter
  uid: StringFilter
  createdAt: DateTimeFilter
  updatedAt: DateTimeFilter
  name: StringFilter

  // Credentials: (Prisma.Without<Prisma.CredentialsNullableRelationFilter, Prisma.CredentialsWhereInput> & Prisma.CredentialsWhereInput) | (Prisma.Without<Prisma.CredentialsWhereInput, Prisma.CredentialsNullableRelationFilter> & Prisma.CredentialsNullableRelationFilter)
  // AuthProvider: (Prisma.Without<Prisma.AuthProviderNullableRelationFilter, Prisma.AuthProviderWhereInput> & Prisma.AuthProviderWhereInput) | (Prisma.Without<Prisma.AuthProviderWhereInput, Prisma.AuthProviderNullableRelationFilter> & Prisma.AuthProviderNullableRelationFilter)
  // Admin: (Prisma.Without<Prisma.AdminNullableRelationFilter, Prisma.AdminWhereInput> & Prisma.AdminWhereInput) | (Prisma.Without<Prisma.AdminWhereInput, Prisma.AdminNullableRelationFilter> & Prisma.AdminNullableRelationFilter)
  // Todo: Add the below field decorator only to the $Enums types.
  // @Field(() => $Enums.x)

  AND: UserWhereInput[]
  OR: UserWhereInput[]
  NOT: UserWhereInput[]
}

@InputType()
export class UserWhereInput extends PartialType(UserWhereInputStrict) {}

@InputType()
export class UserListRelationFilter {
  every?: UserWhereInput
  some?: UserWhereInput
  none?: UserWhereInput
}

@InputType()
export class UserRelationFilter {
  is?: UserWhereInput
  isNot?: UserWhereInput
}
