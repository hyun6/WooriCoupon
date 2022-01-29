import { UserController } from './user/user.controller';
import { CouponController } from './coupon/coupon.controller';
import { CouponService } from './coupon/coupon.service';
import { PrismaService } from './prisma.service';
import { UserService } from './user/user.service';
import { Module } from '@nestjs/common';
@Module({
  imports: [],
  controllers: [UserController, CouponController],
  providers: [CouponService, PrismaService, UserService]
})
export class AppModule {}
