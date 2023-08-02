import { Done } from '@shared/dto';
import { ArticleService } from '@article/article.service';
import { SaleService } from '@article/sale/services/sale.service';
import { values } from './table-values';
import { CreateArticleDto } from '@article/dto/create-article.dto';
import { CategoryService } from '@article/category/category.service';
import { ArticlePhotoService } from '@article/article-photos/article-photo.service';
import { HttpStatus, Logger } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { IFile } from '@article/article-photos/file.interface';

export async function createArticles(
  articleService: ArticleService,
  saleService: SaleService,
  categorieService: CategoryService,
  fileService: ArticlePhotoService,
): Promise<Done> {
  const logger = new Logger('ArticleSeed');

  for (const el of values) {
    try {
      const article = new CreateArticleDto();
      const category = await categorieService.findOne({ name: el.category });

      article.name = el.name;
      article.price = el.price;
      article.discription = el.discription;
      article.characteristic = el.characteristic;
      article.categories = [category ? category.id : -1];

      const createdArticle = await articleService.create(article);

      addSale(createdArticle.id, saleService, el.newPrice);
      addImages(
        createdArticle.id,
        fileService,
        el.picture1Link,
        el.picture2Link,
      );
      logger.log('Article created');
    } catch (err) {}
  }
  return new Done();
}

async function addSale(
  articleId: number,
  saleService: SaleService,
  newPrice: number | undefined,
) {
  if (newPrice) {
    await saleService.create({
      activeTill: new Date('2225-12-12'),
      newPrise: newPrice,
      article: articleId,
    });
  }
}

async function addImages(
  articleId: number,
  fileService: ArticlePhotoService,
  ...imagesUrl: (string | undefined)[]
) {
  for (const imageUrl of imagesUrl) {
    if (imageUrl) {
      const downloaded = await downloadFile(imageUrl);
      if (downloaded) {
        await fileService.add(articleId, [downloaded]);
      }
    }
  }
}

async function downloadFile(url: string): Promise<IFile | null> {
  const response = await fetch(url);

  if (response.status !== HttpStatus.OK) {
    console.log('File does not found');
    return null;
  }
  const buffer = Buffer.from(await response.arrayBuffer());

  return {
    originalname: randomUUID(),
    mimetype: response.headers.get('content-type') || 'image/jpeg',
    buffer: buffer,
  };
}
