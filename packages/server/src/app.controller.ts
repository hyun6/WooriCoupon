import { Controller, Get, Param, Post, Body, Put, Delete } from '@nestjs/common';
import { UserService } from './user/user.service';
import { CouponService } from './coupon/coupon.service';
import { User as UserModel, Coupon as CouponModel } from '@prisma/client';

@Controller()
export class AppController {
  constructor(private readonly userService: UserService, private readonly couponService: CouponService) {}

  @Get('coupon/:id')
  async getCouponById(@Param('id') id: string): Promise<CouponModel> {
    return this.couponService.coupon({ id: Number(id) });
  }

  @Get('feed')
  async getPublishedCoupons(): Promise<CouponModel[]> {
    return this.couponService.coupons({});
  }

  @Get('filtered-coupons/:searchString')
  async getFilteredCoupons(@Param('searchString') searchString: string): Promise<CouponModel[]> {
    return this.couponService.coupons({
      where: {
        OR: [
          {
            title: { contains: searchString }
          },
          {
            content: { contains: searchString }
          }
        ]
      }
    });
  }

  @Post('coupon')
  async createDraft(
    @Body()
    couponData: {
      title: string;
      content?: string;
      authorEmail: string;
      usageCount: number;
      publisherId: number;
    }
  ): Promise<CouponModel> {
    const { title, content, usageCount, publisherId } = couponData;
    return this.couponService.createCoupon({
      title,
      content,
      usageCount,
      publisherId
    });
  }

  @Post('user')
  async signupUser(@Body() userData: { name: string; email: string }): Promise<UserModel> {
    return this.userService.createUser(userData);
  }

  @Put('publish/:id')
  async publishCoupon(@Param('id') id: string): Promise<CouponModel> {
    return this.couponService.updateCoupon({
      where: { id: Number(id) },
      data: {}
      // data: { published: true }
    });
  }

  @Delete('coupon/:id')
  async deleteCoupon(@Param('id') id: string): Promise<CouponModel> {
    return this.couponService.deleteCoupon({ id: Number(id) });
  }
}
