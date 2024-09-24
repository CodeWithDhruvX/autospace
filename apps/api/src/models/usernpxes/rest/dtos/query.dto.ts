import { IsIn, IsOptional } from 'class-validator'
import { Prisma } from '@prisma/client'
import { BaseQueryDto } from 'src/common/dtos/common.dto'

export class UsernpxQueryDto extends BaseQueryDto {
  @IsOptional()
  @IsIn(Object.values(Prisma.UsernpxScalarFieldEnum))
  sortBy?: string

  @IsOptional()
  @IsIn(Object.values(Prisma.UsernpxScalarFieldEnum))
  searchBy?: string
}

