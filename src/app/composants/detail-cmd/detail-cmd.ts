import {Component, Input} from '@angular/core';
import {LigneCommandeClientResponseDto} from '../../../gs-api/src';

@Component({
  selector: 'app-detail-cmd',
  imports: [],
  templateUrl: './detail-cmd.html',
  styleUrl: './detail-cmd.css'
})
export class DetailCmd {

    @Input() ligneCommande: LigneCommandeClientResponseDto={}
}
