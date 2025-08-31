import {Component, EventEmitter, Input, Output} from '@angular/core';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-boutton-action',
  imports: [
    NgIf
  ],
  templateUrl: './boutton-action.html',
  styleUrl: './boutton-action.css'
})
export class BouttonAction {

  @Input() isNouveauVisible = true
  @Input() isExporterVisible = true
  @Input() isImporterVisible= true

  @Output() clickEvent = new EventEmitter();

  bouttonNouveauClick(): void {
    this.clickEvent.emit();
  }

}
