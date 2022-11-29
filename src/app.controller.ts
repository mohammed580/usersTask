import { Body, Controller, Get, Post, Redirect, Render, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { LocalAuthGuard } from './auth/local-auth.graud';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }
  

  @Get()
  @Redirect('users')
  getHello(): string {
    return this.appService.getHello();
  }
}