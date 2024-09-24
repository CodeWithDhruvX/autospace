import { OmitType } from '@nestjs/swagger'
import { UsernpxEntity } from '../entity/usernpx.entity'

export class CreateUsernpx extends OmitType(UsernpxEntity, [
  'createdAt',
  'updatedAt',
  'id',
]) {}
