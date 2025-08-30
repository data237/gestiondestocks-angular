import { Injectable } from '@angular/core';
import {UserService} from '../user/user';
import {ArticleControllerService, ArticleResponseDto} from '../../../gs-api/src';
import {ArticleRequestDto} from '../../../gs-api/src/model/articleRequestDto';
import {Observable, of} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class Article {
    constructor(
      private userService: UserService,
      private articleService: ArticleControllerService
    ) {
    }


    enregistrerArticle(articleRequestDto: ArticleRequestDto): Observable<ArticleResponseDto>{

      // @ts-ignore
      articleRequestDto.entrepriseId = <number>this.userService.getConnectedUser().user?.roles[0].entrepriseId
        return this.articleService.save10(articleRequestDto.codeArticle, articleRequestDto.designation,
          articleRequestDto.categorieId, articleRequestDto.entrepriseId, articleRequestDto.prixUnitaire,
          articleRequestDto.tauxTva, articleRequestDto.prixUnitaireTtc)
    }

    findAllArticle():Observable<Array<ArticleResponseDto>>{
      return this.articleService.findAll10()
    }

    findArticleById(idArticle?: number) : Observable<ArticleResponseDto>{
      if(idArticle){
        return this.articleService.findById10(idArticle)
      }
      return of()
    }

  deleteArticle(idArticle: number):Observable<any> {
      if(idArticle){
        this.articleService.delete10(idArticle)
      }
      return of()
  }

  findArticleByCode(codeArticle: string): Observable<ArticleResponseDto> {
    return this.articleService.findByCodeArticle(codeArticle)
  }
}
