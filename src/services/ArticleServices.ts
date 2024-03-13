import { AppDataSource } from "../data-source";
import { Article } from "../entity/Article";

export default new (class ArticleServices {
  async create(reqBody: any): Promise<any> {
    try {
      const repository = AppDataSource.getRepository(Article);

      const article = repository.create({
        title: reqBody.title,
        content: reqBody.content,
        author: reqBody.author,
        date: reqBody.date,
        image: reqBody.image,
      });

      await AppDataSource.createQueryBuilder()
        .insert()
        .into(Article)
        .values(article)
        .execute();

      console.log(article);
    } catch (error) {
      throw error;
    }
  }

  async find(): Promise<Article[]> {
    try {
      const articles = await AppDataSource.getRepository(Article)
        .createQueryBuilder("article")
        .getMany();

      return articles;
    } catch (error) {
      throw error;
    }
  }

  async findOne(id: number): Promise<any> {
    try {
      const article = await AppDataSource.getRepository(Article)
        .createQueryBuilder("article")
        .where("article.id = :id", { id: id })
        .getOne();

      return article;
    } catch (error) {
      throw new Error(`Error while finding article by id: ${error}`);
    }
  }

  async update(articleId: number, reqBody: any): Promise<any> {
    try {
      const repository = AppDataSource.getRepository(Article);

      await repository
        .createQueryBuilder()
        .update(Article)
        .set(reqBody)
        .where("id = :id", { id: articleId })
        .execute();
    } catch (error) {
      throw error;
    }
  }

  async delete(articleId: number): Promise<any> {
    try {
      const repository = AppDataSource.getRepository(Article);

      await repository
        .createQueryBuilder()
        .delete()
        .from(Article)
        .where("id = :id", { id: articleId })
        .execute();
    } catch (error) {
      throw error;
    }
  }
})();
