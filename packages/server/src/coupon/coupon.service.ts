import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Coupon, Prisma } from '@prisma/client';

@Injectable()
export class CouponService {
  constructor(private prisma: PrismaService) {}

  async coupon(couponWhereUniqueInput: Prisma.CouponWhereUniqueInput): Promise<Coupon | undefined> {
    return this.prisma.coupon.findUnique({
      where: couponWhereUniqueInput
    });
  }

  async coupons(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.CouponWhereUniqueInput;
    where?: Prisma.CouponWhereInput;
    orderBy?: Prisma.CouponOrderByWithAggregationInput;
  }): Promise<Coupon[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.coupon.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy
    });
  }

  async createCoupon(data: Prisma.CouponCreateInput): Promise<Coupon> {
    return this.prisma.coupon.create({
      data
    });
  }

  async updateCoupon(params: {
    where: Prisma.CouponWhereUniqueInput;
    data: Prisma.CouponUpdateInput;
  }): Promise<Coupon> {
    const { data, where } = params;
    return this.prisma.coupon.update({
      data,
      where
    });
  }

  async deleteCoupon(where: Prisma.CouponWhereUniqueInput): Promise<Coupon> {
    return this.prisma.coupon.delete({
      where
    });
  }
}
