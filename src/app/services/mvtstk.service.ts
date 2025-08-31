import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MvtStkControllerService } from '../../gs-api/src/api/mvtStkController.service';
import { MvtStkRequestDto, MvtStkResponseDto } from '../../gs-api/src/model/models';

@Injectable({
  providedIn: 'root'
})
export class MvtStkService {

  constructor(private mvtStkController: MvtStkControllerService) { }

  findAll(): Observable<MvtStkResponseDto[]> {
    return this.mvtStkController.findAll3();
  }

  findById(id: number): Observable<MvtStkResponseDto> {
    return this.mvtStkController.findById3(id);
  }

  create(mvtStk: MvtStkRequestDto): Observable<MvtStkResponseDto> {
    return this.mvtStkController.save3(mvtStk);
  }

  update(id: number, mvtStk: MvtStkRequestDto): Observable<MvtStkResponseDto> {
    return this.mvtStkController.update3(id, mvtStk);
  }

  delete(id: number): Observable<any> {
    return this.mvtStkController.delete3(id);
  }
}
