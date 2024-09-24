import { PartialType } from '@nestjs/swagger'
import { CreateUsernpx } from './create.dto'
import { Usernpx } from '@prisma/client'

export class UpdateUsernpx extends PartialType(CreateUsernpx) {
  id: Usernpx['id']
}

