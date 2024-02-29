import { Injectable } from '@nestjs/common';

@Injectable()
export class MailappService {
  sendWelcomeEmail(email: string) {
    console.log(
      `To: ${email}\nSubject: Welcome to our platform\n\nDear user, welcome to our platform! We hope you enjoy your stay.`,
    );
  }
}
