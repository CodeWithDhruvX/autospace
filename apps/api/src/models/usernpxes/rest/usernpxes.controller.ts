import {
  Controller, Get, Post, Body, Patch, Param, Delete, Query
} from '@nestjs/common'

import { PrismaService } from 'src/common/prisma/prisma.service'
import { ApiTags } from '@nestjs/swagger'
import { CreateUsernpx } from './dtos/create.dto'
import { UsernpxQueryDto } from './dtos/query.dto'
import { UpdateUsernpx } from './dtos/update.dto'
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
} from '@nestjs/swagger'
import { UsernpxEntity } from './entity/usernpx.entity'
import { AllowAuthenticated, GetUser } from 'src/common/auth/auth.decorator'
import { GetUserType } from 'src/common/types'
import { checkRowLevelPermission } from 'src/common/auth/util'


@ApiTags('usernpxes')
@Controller('usernpxes')
export class UsernpxesController {
  constructor(private readonly prisma: PrismaService) {}

  @AllowAuthenticated()
  @ApiBearerAuth()
  @ApiCreatedResponse({ type: UsernpxEntity })
  @Post()
  create(@Body() createUsernpxDto: CreateUsernpx, @GetUser() user: GetUserType) {
    checkRowLevelPermission(user, createUsernpxDto.uid)
    return this.prisma.usernpx.create({ data: createUsernpxDto })
  }

  @ApiOkResponse({ type: [UsernpxEntity] })
  @Get()
  findAll(@Query() { skip, take, order, sortBy }: UsernpxQueryDto) {
    return this.prisma.usernpx.findMany({
      ...(skip ? { skip: +skip } : null),
      ...(take ? { take: +take } : null),
      ...(sortBy ? { orderBy: { [sortBy]: order || 'asc' } } : null),
    })
  }

  @ApiOkResponse({ type: UsernpxEntity })
  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.prisma.usernpx.findUnique({ where: { id } })
  }

  @ApiOkResponse({ type: UsernpxEntity })
  @ApiBearerAuth()
  @AllowAuthenticated()
  @Patch(':id')
  async update(
    @Param('id') id: number,
    @Body() updateUsernpxDto: UpdateUsernpx,
    @GetUser() user: GetUserType,
  ) {
    const usernpx = await this.prisma.usernpx.findUnique({ where: { id } })
    checkRowLevelPermission(user, usernpx.uid)
    return this.prisma.usernpx.update({
      where: { id },
      data: updateUsernpxDto,
    })
  }

  @ApiBearerAuth()
  @AllowAuthenticated()
  @Delete(':id')
  async remove(@Param('id') id: number, @GetUser() user: GetUserType) {
    const usernpx = await this.prisma.usernpx.findUnique({ where: { id } })
    checkRowLevelPermission(user, usernpx.uid)
    return this.prisma.usernpx.delete({ where: { id } })
  }
}
