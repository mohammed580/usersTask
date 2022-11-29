import { Body, Controller, Get, Post, Render, Request, Req, UseGuards, Delete, Redirect, UseFilters } from '@nestjs/common';
import { AppService } from '../app.service';
import { LocalAuthGuard } from '../auth/local-auth.graud';
import { UsersService } from './user.service';

import {
    ExceptionFilter,
    Catch,
    ArgumentsHost,
    HttpException,
} from '@nestjs/common';
import { Response } from 'express';
import { UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';

@Catch(UnauthorizedException)
export class ViewAuthFilter implements ExceptionFilter {
    catch(exception: HttpException, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        const status = exception.getStatus();

        response.status(status).redirect('/users/login');
    }
}

@Controller('users')
export class UserController {
    constructor(private readonly usersServices: UsersService) { }
    @Get()
    @UseGuards(LocalAuthGuard)
    @UseFilters(ViewAuthFilter)
    @Render('users/index')
    index(): void {

    }
    @Get('register')
    @Render('users/register')
    root(): void {
    }

    @Post('register')
    @Render('users/login')
    createUser(@Body() body: any ,createUserDto:CreateUserDto): void {
        this.usersServices.createUser(body)
    }

    @Get('login')
    @Render('users/login')
    loginPage() {
    }


    @UseGuards(LocalAuthGuard)
    @UseFilters(ViewAuthFilter)
    @Post('login')
    @Render('users/index')
    async login(@Request() req): Promise<any> {
        const { isAdmin, username } = req.user._doc;
        let message, Allaccounts
        let accounts = [];
        if (isAdmin === true) {
            message = 'welcome back'
            Allaccounts = await this.usersServices.findAll()
                .then((acc) => {
                    accounts = (acc)
                })

        } else {
            message = 'your not admin go back'
        }

        return { message, isAdmin, accounts };
    }

    @Post('accounts/delete/:id')
    @Redirect('/users')
    delete(@Request() req) {
        const { id } = req.params
        console.log(id)
        this.usersServices.deleteUser(id)
    }

    @Post('accounts/update/:id')
    @Redirect('/users')
    update(@Request() req) { 

        const { id } = req.params
        const body = { ...req.body }
        body.isAdmin === 'on' ? (body.isAdmin = true) : (body.isAdmin = false)
        console.log(body)
        this.usersServices.updateUser(id, body)
    }
}