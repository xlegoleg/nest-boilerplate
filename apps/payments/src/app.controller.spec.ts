import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';

describe('AuthController', () => {
  let authController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
    }).compile();

    authController = app.get<AppController>(AppController);
  });

  describe('root', () => {
    it('should return "hello"', () => {
      expect(authController.getHello()).toBe('hello');
    });
  });
});
