import { Test, TestingModule } from '@nestjs/testing';
import { Coupon } from '@prisma/client';
import { PrismaService } from '../prisma.service';
import { CouponService } from './coupon.service';

// TODO: 테스트 시 Prisma DB를 mock 을 사용하는 경우와 직접 사용하는 경우를 모두 테스트하고 싶다
// - 현재 방법은 mock을 사용하는 방식 (참고: https://github.com/jmcdo29/testing-nestjs/blob/master/apps/prisma-sample/src/cat/cat.service.spec.ts)
// - .env.test 파일을 통해 테스트용 DB파일을 따로 두는 방식 살펴보자 (https://www.prisma.io/docs/guides/development-environment/environment-variables/using-multiple-env-files)
class PrismaServiceMock {
  onModuleInit = jest.fn();
  enableShutdownHooks = jest.fn();

  coupon = {
    findMany: jest.fn().mockResolvedValue(mockCoupons),
    findUnique: jest.fn().mockResolvedValue(mockOneCoupon),
    findFirst: jest.fn().mockResolvedValue(mockOneCoupon),
    create: jest.fn().mockReturnValue(mockOneCoupon),
    save: jest.fn(),
    update: jest.fn().mockResolvedValue(mockOneCoupon),
    delete: jest.fn().mockResolvedValue(mockOneCoupon)
  };
}

const mockCoupons: Coupon[] = [
  {
    id: 1,
    title: 'test',
    content: 'test content',
    usageCount: 1,
    publisherId: 1,
    ownerId: 1
  },
  {
    id: 2,
    title: 'test2',
    content: 'test content2',
    usageCount: 2,
    publisherId: 1,
    ownerId: 1
  }
];

const mockOneCoupon = mockCoupons[0];

describe('CouponService', () => {
  let service: CouponService;
  let prismaService: PrismaServiceMock;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CouponService,
        PrismaService
        // {
        //   provide: PrismaService,
        //   useClass: PrismaServiceMock
        // }
      ]
    }).compile();

    service = module.get(CouponService);
    prismaService = module.get(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('coupon', () => {
    it('should return found coupon', async () => {
      const coupon = await service.coupon({ id: 2 });
      console.log(coupon);
      expect(coupon).toEqual(mockOneCoupon);
    });
  });

  describe('coupons', () => {
    it('should return all coupons', async () => {
      const coupons = await service.coupons({});
      console.log(coupons);
      expect(coupons).toEqual(mockCoupons);
    });
  });

  describe('createCoupon', () => {
    it('should', () => {
      service.createCoupon({
        title: 'test',
        content: 'test coupon',
        usageCount: 1,
        publisherId: 1
        //owner: 2
      });
    });
  });

  describe('updateCoupon', () => {
    it('should', () => {
      service.updateCoupon({ where: { id: 1 }, data: {} });
    });
  });

  describe('deleteCoupon', () => {
    it('should', () => {
      service.deleteCoupon({});
    });
  });
});
