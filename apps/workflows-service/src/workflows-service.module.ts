import { Module } from '@nestjs/common'
import { WorkflowsServiceController } from './workflows-service.controller'
import { WorkflowsServiceService } from './workflows-service.service'
import { WorkflowsModule } from './workflows/workflows.module'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { TypeOrmModule } from '@nestjs/typeorm'

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('POSTGRES_HOST'),
        port: parseInt(configService.get('POSTGRES_PORT') || '5432', 10),
        username: configService.get('POSTGRES_USER'),
        password: configService.get('POSTGRES_PASSWORD'),
        database: configService.get('POSTGRES_NAME'),
        autoLoadEntities: true,
        synchronize: true,
      }),
      inject: [ConfigService],
    }),
    WorkflowsModule,
  ],
  controllers: [WorkflowsServiceController],
  providers: [WorkflowsServiceService],
})
export class WorkflowsServiceModule {}
