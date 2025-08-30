import { Component } from '@angular/core';
import {BouttonAction} from "../../../composants/boutton-action/boutton-action";
import {DetailArticle} from "../../../composants/detail-article/detail-article";
import {Pagination} from "../../../composants/pagination/pagination";
import {Router} from '@angular/router';
import {CategorieResponseDto} from '../../../../gs-api/src';
import {Category} from '../../../services/category/category';
import {NgForOf, NgIf} from '@angular/common';

@Component({
  selector: 'app-page-categories',
  imports: [
    BouttonAction,
    Pagination,
    NgForOf,
    NgIf
  ],
  templateUrl: './page-categories.html',
  styleUrl: './page-categories.css'
})
export class PageCategories {

   listCategories: Array<CategorieResponseDto> = []
  selectedCatIdToDelete: number | undefined =-1
  errorMsg =''
  categoryResponseDto: CategorieResponseDto={}
  constructor(
    private router: Router,
    private categoryService: Category
  ) {
  }

  ngOnInit(): void {
    this.findAllCategories()
  }

  findAllCategories(): void{
    this.categoryService.findAll()
      .subscribe({
        next: (res) => {
          this.listCategories = res
        }
      })
  }
  nouvelCategory(): void {
    this.router.navigate(['nouvellecategorie'])
  }

  modifierCategory(id?: number | undefined): void {
    this.router.navigate(['nouvellecategorie', id])
  }

  confirmerEtSupprimerCat():void {
      if(this.selectedCatIdToDelete !== -1 && this.selectedCatIdToDelete !== undefined){
        this.categoryService.delete(this.selectedCatIdToDelete)
          .subscribe({
            next: (res) => {
              this.findAllCategories()
            }, error: (error)=>{
              this.errorMsg = error.error.errors
              }
          })
      }
  }

  annulerSuppressionCat(): void {
    this.selectedCatIdToDelete = -1
  }

  selectCategoriePourSupprimer(id?: number | undefined): void {
      this.selectedCatIdToDelete = id
  }
}
