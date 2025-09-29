import { Injectable } from '@nestjs/common';

/**
 * Serviço para a página de destino da pizzaria.
 */
@Injectable()
export class LandingPageService {
  /**
   * Retorna os dados para a seção de destaque da página de destino.
   * @returns Um objeto contendo o título, a descrição e a imagem de destaque.
   */
  getHeroSectionData(): { title: string; description: string; imageUrl: string } {
    return {
      title: 'A Melhor Pizza da Cidade',
      description: 'Ingredientes frescos e sabor inigualável.',
      imageUrl: 'https://exemplo.com/pizza-destaque.jpg',
    };
  }

  /**
   * Retorna os dados para a seção de promoções da página de destino.
   * @returns Um array de objetos contendo informações sobre cada promoção.
   */
  getPromotionsData(): { id: number; title: string; description: string; imageUrl: string; price: number }[] {
    return [
      {
        id: 1,
        title: 'Pizza Grande + Refrigerante',
        description: 'Aproveite nossa pizza grande com um refrigerante gelado.',
        imageUrl: 'https://exemplo.com/pizza-promocao1.jpg',
        price: 49.90,
      },
      {
        id: 2,
        title: 'Pizza Média com Borda Recheada',
        description: 'Experimente nossa deliciosa pizza média com borda recheada.',
        imageUrl: 'https://exemplo.com/pizza-promocao2.jpg',
        price: 39.90,
      },
    ];
  }

  /**
   * Retorna os dados para a seção de depoimentos da página de destino.
   * @returns Um array de objetos contendo informações sobre cada depoimento.
   */
  getTestimonialsData(): { id: number; author: string; testimonial: string; imageUrl: string }[] {
    return [
      {
        id: 1,
        author: 'João Silva',
        testimonial: 'A melhor pizza que já comi! Recomendo a todos.',
        imageUrl: 'https://exemplo.com/joao-silva.jpg',
      },
      {
        id: 2,
        author: 'Maria Oliveira',
        testimonial: 'Pizza deliciosa e entrega rápida. Ótimo atendimento!',
        imageUrl: 'https://exemplo.com/maria-oliveira.jpg',
      },
    ];
  }
}