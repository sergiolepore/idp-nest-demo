import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { CreateDeveloperDto } from './dto/create-developer.dto';
import { UpdateDeveloperDto } from './dto/update-developer.dto';
import { Developer } from './entities/developer.entity';

@Injectable()
export class DevelopersService {
  private readonly developersDB: Developer[] = [];

  constructor(@Inject('MAIL_SERVICE') private mailService: ClientProxy) {}

  create(createDeveloperDto: CreateDeveloperDto): Developer {
    const newDeveloper = new Developer(
      this.developersDB.length + 1,
      createDeveloperDto.name,
      createDeveloperDto.email,
    );

    this.developersDB.push(newDeveloper);

    this.mailService.emit('welcome_email', newDeveloper.email);

    return newDeveloper;
  }

  findAll(): Developer[] {
    return this.developersDB;
  }

  findOne(id: number): Developer | undefined {
    return this.developersDB.find((developer) => developer.id === id);
  }

  update(
    id: number,
    updateDeveloperDto: UpdateDeveloperDto,
  ): Developer | undefined {
    const developer = this.findOne(id);

    if (developer) {
      developer.name = updateDeveloperDto.name;
      developer.email = updateDeveloperDto.email;
    }

    return developer;
  }

  remove(id: number) {
    const index = this.developersDB.findIndex(
      (developer) => developer.id === id,
    );

    if (index !== -1) {
      this.developersDB.splice(index, 1);
    }
  }

  removeAll() {
    this.developersDB.splice(0, this.developersDB.length);
  }
}
