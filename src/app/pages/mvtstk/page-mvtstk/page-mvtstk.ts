import { Component } from '@angular/core';
import {BouttonAction} from "../../../composants/boutton-action/boutton-action";
import {DetailArticle} from "../../../composants/detail-article/detail-article";
import {Pagination} from "../../../composants/pagination/pagination";
import {DetailMvtStkArticle} from '../../../composants/detail-mvt-stk-article/detail-mvt-stk-article';
import {DetailMvtStk} from '../../../composants/detail-mvt-stk/detail-mvt-stk';

@Component({
  selector: 'app-page-mvtstk',
  imports: [
    BouttonAction,
    Pagination,
    DetailMvtStkArticle,
    DetailMvtStk
  ],
  templateUrl: './page-mvtstk.html',
  styleUrl: './page-mvtstk.css'
})
export class PageMvtstk {

}
