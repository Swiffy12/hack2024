import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { PrismaModule } from './prisma/prisma.module';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './auth/auth.guard';
import { RolesGuard } from './roles/roles.guard';
import { TournmentsModule } from './tournments/tournments.module';

@Module({
  imports: [AuthModule, UsersModule, PrismaModule, TournmentsModule],
  controllers: [AppController],
  providers: [AppService,
    {
			provide: APP_GUARD,
			useClass: AuthGuard,
		},
    {
			provide: APP_GUARD,
			useClass: RolesGuard,
		},
  ],
})
export class AppModule {}
