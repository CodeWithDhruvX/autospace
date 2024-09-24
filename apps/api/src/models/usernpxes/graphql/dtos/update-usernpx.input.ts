import { CreateUsernpxInput } from './create-usernpx.input'
import { InputType, PartialType } from '@nestjs/graphql'
import { Usernpx } from '@prisma/client'

@InputType()
export class UpdateUsernpxInput extends PartialType(CreateUsernpxInput) {
  id: Usernpx['id']
}
