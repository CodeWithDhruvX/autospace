import { Module } from '@nestjs/common'
import { UsernpxesService } from './graphql/usernpxes.service'
import { UsernpxesResolver } from './graphql/usernpxes.resolver'
import { UsernpxesController } from './rest/usernpxes.controller'

@Module({
  providers: [UsernpxesResolver, UsernpxesService],
  exports: [UsernpxesService],
  controllers: [UsernpxesController],
})
export class UsernpxesModule {}
