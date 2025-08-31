import { Component } from '@angular/core';
import {Pagination} from '../../../composants/pagination/pagination';
import {BouttonAction} from '../../../composants/boutton-action/boutton-action';
import {Router} from '@angular/router'
import {NgForOf, NgIf, CurrencyPipe} from '@angular/common';
import {ArticleResponseDto} from '../../../../gs-api/src';
import {Article} from '../../../services/article/article';
import {ModalConfirmation} from '../../../composants/modal-confirmation/modal-confirmation';
@Component({
  selector: 'app-page-article',
  imports: [
    Pagination,
    BouttonAction,
    NgForOf,
    NgIf,
    CurrencyPipe,
    ModalConfirmation
  ],
  templateUrl: './page-article.html',
  styleUrl: './page-article.css'
})
export class PageArticle {
  listArticle: Array<ArticleResponseDto>=[];
  errorMsg = ''
  showDeleteModal = false;
  articleToDelete: ArticleResponseDto | null = null;
  
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
    this.articleToDelete = article;
    this.showDeleteModal = true;
  }

  confirmerSuppression(): void {
    if (this.articleToDelete?.id) {
      this.articleService.deleteArticle(this.articleToDelete.id)
        .subscribe({
          next: () => {
            this.findListArticle();
            this.showDeleteModal = false;
            this.articleToDelete = null;
          },
          error: (error) => {
            this.errorMsg = 'Erreur lors de la suppression';
            this.showDeleteModal = false;
          }
        });
    }
  }

  annulerSuppression(): void {
    this.showDeleteModal = false;
    this.articleToDelete = null;
  }

  getDeleteMessage(): string {
    return `Êtes-vous sûr de vouloir supprimer l'article "${this.articleToDelete?.designation || ''}" ?`;
  }

  voirDetails(article: ArticleResponseDto): void {
    this.router.navigate(['articles', 'detail', article.id]);
  }
}
