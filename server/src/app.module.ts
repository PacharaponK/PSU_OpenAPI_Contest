import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FormsModule } from './forms/forms.module';
import { Form } from './forms/entities/form.entity';

@Module({
  imports: [TypeOrmModule.forRoot({
    type: 'sqlite',
    database: './app.sqlite',
    entities: [Form],
    synchronize: process.env.NODE_ENV !== 'production'
  }), FormsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
