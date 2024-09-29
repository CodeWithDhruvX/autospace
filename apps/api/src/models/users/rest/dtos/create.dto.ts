import { PickType } from '@nestjs/graphql'
import { UserEntity } from '../entity/user.entity'

export class CreateUser extends PickType(UserEntity, ['uid', 'name']) {}
