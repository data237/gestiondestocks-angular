import { Component } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Article} from '../../../services/article/article';
import {ArticleRequestDto} from '../../../../gs-api/src/model/articleRequestDto';
import {CategorieRequestDto, CategorieResponseDto} from '../../../../gs-api/src';
import {Category} from '../../../services/category/category';
import {NgForOf, NgIf} from '@angular/common';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-nouvel-article',
  imports: [
    NgForOf,
    FormsModule,
    NgIf
  ],
  templateUrl: './nouvel-article.html',
  styleUrl: './nouvel-article.css'
})
export class NouvelArticle {

  articleRequestDto: ArticleRequestDto = {
    codeArticle: '',
    designation: '',
    prixUnitaire: 0,
    tauxTva: 0,
    prixUnitaireTtc: 0,
    photo: '',
    categorieId: 0,
    entrepriseId: 0
  }
  categorieResponseDto: CategorieResponseDto = {}
  listeCategorie: Array<CategorieResponseDto> = []
  errorMsg : Array<string>=[]

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private articleService: Article,
    private categoriService: Category
  ) {
  }

  ngOnInit(): void{
    this.categoriService.findAll()
      .subscribe({
        next : (categories)=>{
          this.listeCategorie = categories
        }
      })

    const idArticle = this.activatedRoute.snapshot.params['idArticle']
    if(idArticle){
      this.articleService.findArticleById(idArticle)
        .subscribe({
          next: (article)=>{
            this.articleRequestDto = {
              codeArticle: article.codeArticle ?? 'bgfhdtt',
              designation: article.designation ?? '',
              prixUnitaire: article.prixUnitaire ?? 0,
              tauxTva: article.tauxTva ?? 0,
              prixUnitaireTtc: article.prixUnitaireTtc ?? 0,
              photo: article.photo ?? '',
              categorieId: article.categorie?.id ?? 0,
              entrepriseId: article.entreprise?.id ?? 0

            }
            this.categorieResponseDto = article.categorie ? article : {}
          }
        })
    }
  }


  cancel(): void {
    this.router.navigate(['articles'])
  }

  enregistrerArticle(): void {
    if (this.categorieResponseDto.id != null) {
      this.articleRequestDto.categorieId = this.categorieResponseDto.id
    }
    this.articleService.enregistrerArticle(this.articleRequestDto)
      .subscribe({
        next : (art)=>{
            this.router.navigate(['articles'])
        }, error: (error)=>{
          console.log(error.error.errors)
          this.errorMsg = error.error.errors
    }
      })
  }

  calculerTTC() : void {
    if(this.articleRequestDto.prixUnitaire && this.articleRequestDto.tauxTva){
      this.articleRequestDto.prixUnitaireTtc =
        +this.articleRequestDto.prixUnitaire + (+(this.articleRequestDto.prixUnitaire * (this.articleRequestDto.tauxTva/100)))
    }
  }
}
