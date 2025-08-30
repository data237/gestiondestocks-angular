import { Component } from '@angular/core';
import {DetailArticle} from '../../../composants/detail-article/detail-article';
import {Pagination} from '../../../composants/pagination/pagination';
import {BouttonAction} from '../../../composants/boutton-action/boutton-action';
import {Router} from '@angular/router'
import {NgForOf, NgIf} from '@angular/common';
import {ArticleResponseDto} from '../../../../gs-api/src';
import {Article} from '../../../services/article/article';
@Component({
  selector: 'app-page-article',
  imports: [
    DetailArticle,
    Pagination,
    BouttonAction,
    NgForOf,
    NgIf
  ],
  templateUrl: './page-article.html',
  styleUrl: './page-article.css'
})
export class PageArticle {
  listArticle: Array<ArticleResponseDto>=[];
  errorMsg = ''
  constructor(
    private router: Router,
    private articleService :Article
  ) {
  }

  ngOnInit(): void{
     this.findListArticle()
  }

  findListArticle(): void{
    this.articleService.findAllArticle()
      .subscribe({
        next: (articles) =>{
          this.listArticle = articles
        }
      })
  }
  nouvelArticle(): void{
    this.router.navigate(['nouvelarticle']);
  }


  handleSuppression($event: any):void {
    if($event === 'success'){
        this.findListArticle()
      }else{
        this.errorMsg = $event
      }
  }
}
