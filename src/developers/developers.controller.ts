import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { AuthUser } from '../users/authuser.decorator';
import { AuthGuard } from '../users/auth.guard';
import { User } from '../users/user.entity';
import { Roles } from '../users/roles.decorator';
import { DevelopersService } from './developers.service';
import { CreateDeveloperDto } from './dto/create-developer.dto';
import { UpdateDeveloperDto } from './dto/update-developer.dto';

@Controller('developers')
@UseGuards(AuthGuard)
export class DevelopersController {
  constructor(private readonly developersService: DevelopersService) {}

  @Post()
  @Roles(['admin'])
  create(
    @Body() createDeveloperDto: CreateDeveloperDto,
    @AuthUser() user: User,
  ) {
    console.log('User from request:', user);
    return this.developersService.create(createDeveloperDto);
  }

  @Get()
  @Roles(['admin', 'viewer'])
  findAll() {
    return this.developersService.findAll();
  }

  @Get(':id')
  @Roles(['admin', 'viewer'])
  findOne(@Param('id') id: string) {
    return this.developersService.findOne(+id);
  }

  @Patch(':id')
  @Roles(['admin'])
  update(
    @Param('id') id: string,
    @Body() updateDeveloperDto: UpdateDeveloperDto,
  ) {
    return this.developersService.update(+id, updateDeveloperDto);
  }

  @Delete(':id')
  @Roles(['admin'])
  remove(@Param('id') id: string) {
    return this.developersService.remove(+id);
  }
}
