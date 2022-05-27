import { Module } from '@nestjs/common';
import { TasksModule } from './tasks/tasks.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmExModule } from './database/typeorm-ex.module';
import { TasksRepository } from './tasks/tasks.repository';
import { UsersRepository } from './auth/users.repository';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    TasksModule,
    AuthModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'task-management',
      synchronize: true,
      // autoLoadEntities: true,
      entities: [__dirname + '/**/*.entity.{js,ts}'],
    }),
    TypeOrmExModule.forCustomRepository([TasksRepository, UsersRepository]),
  ],
})
export class AppModule {}
