import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Ip,
  Param,
  ParseBoolPipe,
  Query,
  Req,
  Res,
} from '@nestjs/common';
import { Request, Response } from 'express';

@Controller('test')
export class TestController {
  @Get()
  @HttpCode(HttpStatus.I_AM_A_TEAPOT)
  sayHelloWorld(): string {
    // GET localhost:3000/test
    return 'Hello World!';
  }

  @Get('hi-express')
  sayHiToMeUsingExpressReq(
    @Req() req: Request,
    @Res() res: Response,
  ): Response<string> {
    // GET localhost:3000/test/hi-express?name=Sergio
    const name = req.query.name || 'there';
    return res.status(200).send(`Hi ${name}!`);
  }

  @Get('hi-decorator')
  sayHiToMeUsingQueryDecorator(@Query('name') name: string): string {
    // GET localhost:3000/test/hi-decorator?name=Sergio
    return `Hi ${name}!`;
  }

  @Get('hi-ip')
  sayHiWithIp(
    @Ip() ipAddress,
    @Query('name') name: string,
    @Query('incognito', ParseBoolPipe) incognito: boolean,
  ): string {
    // GET localhost:3000/test/hi-ip?name=Sergio&incognito=true
    // GET localhost:3000/test/hi-ip?name=Sergio&incognito=false
    if (incognito) {
      return `Hi ${name}! Your IP is hidden!`;
    }

    return `Hi ${name}! Your IP is ${ipAddress}!`;
  }

  @Get('hi-async')
  sayHiWithDelay(@Query('delay') delay: number = 5000): Promise<string> {
    // GET localhost:3000/test/hi-async?delay=2000
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve('Hi Sergio!');
      }, delay);
    });
  }

  @Get(':name')
  sayHiUsingPathParams(@Param('name') name: string): string {
    // GET localhost:3000/test/hi-Sergio
    return `Hi ${name}!`;
  }
}
