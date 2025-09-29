import { Controller, Get, HttpStatus, Res } from '@nestjs/common';
import { LandingPageService } from './landing-page.service';
import { Response } from 'express';

/**
 * Controller responsável por lidar com as requisições da landing page.
 */
@Controller('landing-page')
export class LandingPageController {
  constructor(private readonly landingPageService: LandingPageService) {}

  /**
   * Rota para obter os dados iniciais da landing page.
   * @param res Objeto de resposta do Express.
   * @returns Uma promise que resolve para um objeto contendo os dados da landing page.
   */
  @Get()
  async getLandingPageData(@Res() res: Response): Promise<void> {
    try {
      const data = await this.landingPageService.getLandingPageData();
      res.status(HttpStatus.OK).json(data);
    } catch (error) {
      // Lidar com erros aqui, como logar o erro e retornar uma resposta de erro adequada.
      console.error('Erro ao obter dados da landing page:', error);
      res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ message: 'Erro ao obter dados da landing page' });
    }
  }
}