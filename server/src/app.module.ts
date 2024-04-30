import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FormsModule } from './forms/forms.module';
import { Form } from './forms/entities/form.entity';
import { CategoriesModule } from './categories/categories.module';
import { Category } from './categories/entities/category.entity';
import { PsuApiModule } from './psu-api/psu-api.module';
import { UsersModule } from './users/users.module';
import { User } from './users/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forRoot({
    type: 'sqlite',
    database: './app.sqlite',
    entities: [Form, Category, User],
    synchronize: process.env.NODE_ENV !== 'production'
  }), FormsModule, CategoriesModule, PsuApiModule, UsersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
