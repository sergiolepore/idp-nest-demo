import { Controller } from '@nestjs/common';
import { EventPattern } from '@nestjs/microservices';
import { MailappService } from './mailapp.service';

@Controller()
export class MailappController {
  constructor(private readonly mailappService: MailappService) {}

  @EventPattern('welcome_email')
  async sendWelcomeEmail(email: string) {
    this.mailappService.sendWelcomeEmail(email);
  }
}
