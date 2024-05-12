import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import { NotifyEmailDto } from './dto/notify-email.dto';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class NotificationsService {
  constructor(private readonly configService: ConfigService) {}

  private readonly transport = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      type: 'OAuth2',
      user: this.configService.get('NOTIFICATIONS_SMTP_USER'),
      clientId: this.configService.get('NOTIFICATIONS_CLIENT_ID'),
      clientSecret: this.configService.get('NOTIFICATIONS_CLIENT_SECRET'),
      refreshToken: this.configService.get('NOTIFICATIONS_REFRESH_TOKEN'),
    },
  });
  async notifyEmail({ email, text }: NotifyEmailDto) {
    return this.transport.sendMail({
      from: this.configService.get('NOTIFICATIONS_SMTP_USER'),
      to: email,
      subject: 'Nodemailer Notification',
      text,
    });
  }
}
