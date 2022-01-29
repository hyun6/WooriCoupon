/*
https://docs.nestjs.com/controllers#controllers
*/

import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { CouponService } from './coupon.service';
import { Coupon as CouponModel } from '@prisma/client';

@Controller()
export class CouponController {
  constructor(private readonly couponService: CouponService) {}

  @Get('coupon/:id')
  async getCouponById(@Param('id') id: string): Promise<CouponModel> {
    return this.couponService.coupon({ id: Number(id) });
  }

  @Get('coupon')
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
  async createCoupon(
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

  @Put('coupon/:id')
  async updateCoupon(@Param('id') id: string): Promise<CouponModel> {
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
