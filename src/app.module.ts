import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dataSource, jwtConfig } from '@config';
import {
  AuthModule,
  CategoryModule,
  IngredientModule,
  RecipeModule,
  RecipeStepModule,
  UserModule,
} from '@modules';
import { IsExistsConstraint, IsUniqueConstraint } from '@validators';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from '@guards';
import { MemoryStoredFile, NestjsFormDataModule } from 'nestjs-form-data';
import { MulterModule } from '@nestjs/platform-express';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: () => dataSource.options,
    }),
    ConfigModule.forRoot(),
    JwtModule.register({
      global: true,
      secret: jwtConfig.secret,
      signOptions: { expiresIn: jwtConfig.expiresIn },
    }),
    NestjsFormDataModule.config({
      isGlobal: true,
      storage: MemoryStoredFile,
      cleanupAfterFailedHandle: true,
      cleanupAfterSuccessHandle: true,
    }),
    MulterModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        dest: configService.get<string>('MULTER_DEST'),
      }),
      inject: [ConfigService],
    }),
    UserModule,
    AuthModule,
    IngredientModule,
    RecipeModule,
    RecipeStepModule,
    CategoryModule,
  ],
  controllers: [],
  providers: [
    IsUniqueConstraint,
    IsExistsConstraint,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
})
export class AppModule {}
