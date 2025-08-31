import { Injectable } from '@angular/core';
import {UserService} from '../user/user';
import {CategorieControllerService, CategorieRequestDto, CategorieResponseDto} from '../../../gs-api/src';
import {Observable, of} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class Category {
  constructor(
    private userService: UserService,
    private   categoryService: CategorieControllerService
  ) {
  }

  enregistrerCategory(categoryRequestDto: CategorieRequestDto): Observable<CategorieResponseDto>{
    categoryRequestDto.entrepriseId = this.userService.getConnectedUser().user?.entrepriseId
    return this.categoryService.save9(categoryRequestDto)
  }

  findAll(): Observable<Array<CategorieResponseDto>>{
    return this.categoryService.findAll9()
  }

  findById(idCategory: number): Observable<CategorieResponseDto> {
    return this.categoryService.findById9(idCategory)
  }

  delete(idCategorie?: number):Observable<any> {
    if(idCategorie){
      return this.categoryService.delete9(idCategorie)
    }
    return of()
  }
}
