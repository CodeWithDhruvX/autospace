import { InputType, PickType } from '@nestjs/graphql'
import { Usernpx } from '../entity/usernpx.entity'

@InputType()
export class CreateUsernpxInput extends PickType(Usernpx,[],InputType) {}

