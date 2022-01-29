/*
https://docs.nestjs.com/controllers#controllers
*/

import { Body, Controller, Post } from '@nestjs/common';
import { CouponService } from 'src/coupon/coupon.service';
import { UserService } from './user.service';
import { User as UserModel } from '@prisma/client';

@Controller()
export class UserController {
  constructor(private readonly userService: UserService, private readonly couponService: CouponService) {}

  @Post('user')
  async signupUser(@Body() userData: { name: string; email: string }): Promise<UserModel> {
    return this.userService.createUser(userData);
  }
}
