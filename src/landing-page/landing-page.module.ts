import { Module } from '@nestjs/common';
import { LandingPageController } from './landing-page.controller';
import { LandingPageService } from './landing-page.service';

/**
 * Módulo responsável pela funcionalidade da landing page.
 *
 * Este módulo agrupa o controller e o service relacionados à landing page,
 * permitindo que sejam injetados e utilizados em outras partes da aplicação.
 */
@Module({
  controllers: [LandingPageController],
  providers: [LandingPageService],
})
export class LandingPageModule {}