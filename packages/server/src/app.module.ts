import { CouponService } from './coupon/coupon.service';
import { PrismaService } from './prisma.service';
import { UserService } from './user/user.service';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [CouponService, PrismaService, UserService, AppService]
})
export class AppModule {}
