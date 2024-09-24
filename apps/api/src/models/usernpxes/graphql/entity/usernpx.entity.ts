import { ObjectType } from '@nestjs/graphql'
import { Usernpx as UsernpxType } from '@prisma/client'
import { RestrictProperties } from 'src/common/dtos/common.input'

@ObjectType()
export class Usernpx implements RestrictProperties<Usernpx,UsernpxType> {
    // Todo Add below to make optional fields optional.
    // @Field({ nullable: true })
}
