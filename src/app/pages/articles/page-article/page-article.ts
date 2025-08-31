import { Component } from '@angular/core';
import {Pagination} from '../../../composants/pagination/pagination';
import {BouttonAction} from '../../../composants/boutton-action/boutton-action';
import {Router} from '@angular/router'
import {NgForOf, NgIf, CurrencyPipe} from '@angular/common';
import {ArticleResponseDto} from '../../../../gs-api/src';
import {Article} from '../../../services/article/article';
@Component({
  selector: 'app-page-article',
  imports: [
    Pagination,
    BouttonAction,
    NgForOf,
    NgIf,
    CurrencyPipe
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

  modifierArticle(article: ArticleResponseDto): void {
    this.router.navigate(['nouvelarticle', article.id]);
  }

  supprimerArticle(article: ArticleResponseDto): void {
    if (confirm('Êtes-vous sûr de vouloir supprimer cet article ?')) {
      this.articleService.deleteArticle(article.id!)
        .subscribe({
          next: () => {
            this.findListArticle();
          },
          error: (error) => {
            this.errorMsg = 'Erreur lors de la suppression';
          }
        });
    }
  }

  voirDetails(article: ArticleResponseDto): void {
    // Implement view details logic
    console.log('Voir détails:', article);
  }
}
