import { Component } from '@angular/core';
import {DetailArticle} from '../detail-article/detail-article';
import {DetailCmd} from '../detail-cmd/detail-cmd';
import {ActivatedRoute, Router} from '@angular/router';
import {
  ArticleResponseDto,
  ClientResponseDto,
  CommandeClientControllerService, CommandeClientRequestDto, CommandeFournisseurRequestDto,
  LigneCommandeClientResponseDto
} from '../../../gs-api/src';
import {Cltfrs} from '../../services/cltfrs/cltfrs';
import {FormsModule} from '@angular/forms';
import {NgForOf, NgIf} from '@angular/common';
import {ArticleRequestDto} from '../../../gs-api/src/model/articleRequestDto';
import {Article} from '../../services/article/article';
import {error} from 'ng-packagr/src/lib/utils/log';
import {Cmdcltfrs} from '../../services/cmdcltfrs/cmdcltfrs';

@Component({
  selector: 'app-nouvelle-cmd-clt-frs',
  imports: [
    DetailCmd,
    FormsModule,
    NgForOf,
    NgIf
  ],
  templateUrl: './nouvelle-cmd-clt-frs.html',
  styleUrl: './nouvelle-cmd-clt-frs.css'
})
export class NouvelleCmdCltFrs {

  origin = '';
  selectedClientFournisseur: ClientResponseDto={}
  listClientsFournisseurs: Array<ClientResponseDto> =[]
  searchArticleDto: ArticleResponseDto={}
  listArticle: Array<ArticleResponseDto>=[]
  articleErrorMsg = '';
  codeArticle= '';
  quantite='';

  lignesCommande : Array<LigneCommandeClientResponseDto>= []
  totalCommande = 0;
  articleNotYetSelected= false ;
  errorMsg: Array<string> = [];
  codeCommande='';

  constructor(
    private router: Router,
    private activateRoute: ActivatedRoute,
    private cltFrsService: Cltfrs,
    private articleService: Article,
    private commandeClientService: CommandeClientControllerService,
    private cmdCltFrsService: Cmdcltfrs
  ) {}

  ngOnInit(): void{
    this.activateRoute.data.subscribe(data =>{
      this.origin = data['origin']
    })
    this.findAll()
    this.findAllArticles()
  }

  cancel() {
    this.router.navigate(['commandesfournisseur'])
  }

  findAll(){
    if(this.origin === 'client'){
      this.cltFrsService.findAllClients()
        .subscribe({
          next: (clients)=>{
            this.listClientsFournisseurs = clients
          }
        })
    }else if(this.origin === 'fournisseur'){
      this.cltFrsService.findAllFournisseurs()
        .subscribe({
          next: (fournisseurs)=>{
            this.listClientsFournisseurs = fournisseurs
          }
        })
    }
  }

  findAllArticles():void{
    this.articleService.findAllArticle()
      .subscribe({
        next: (articles)=>{
          this.listArticle = articles
        }
      })
  }
    findArticleByCode(codeArticle: string): void{
     this.articleErrorMsg = ''
      if(codeArticle){
        this.articleService.findArticleByCode(codeArticle)
          .subscribe({
            next: (article)=>{
              this.searchArticleDto = article
            }, error: (error)=>{
              this.articleErrorMsg = error.error.message
        }
          })
      }
    }

  searchArticle(): void {
    if(this.codeArticle.length === 0){
      this.findAllArticles()
    }
      this.listArticle = this.listArticle
        .filter(art => art.codeArticle?.startsWith(this.codeArticle) ||
        art.designation?.startsWith(this.codeArticle))
  }

  ajouterLigneCommande(): void {
    const ligneCmdAlreadyExists = this.lignesCommande.find(lig =>
      lig.article?.codeArticle === this.searchArticleDto.codeArticle)
    if(ligneCmdAlreadyExists){
      this.lignesCommande.forEach(lig=>{
        if(lig && lig.article?.codeArticle === this.searchArticleDto.codeArticle){
          // @ts-ignore
          lig.quantite = +lig.quantite + +this.quantite
        }
      })
      this.quantite = ligneCmdAlreadyExists.quantite + this.quantite
    }else{
      const ligneCmd: LigneCommandeClientResponseDto = {
        article: this.searchArticleDto,
        prixUnitaire: this.searchArticleDto.prixUnitaireTtc,
        quantite: +this.quantite
      }

      this.lignesCommande.push(ligneCmd)

    }
    this.totalCommande = 0
    this.lignesCommande.forEach(ligne=>{
      if(ligne.prixUnitaire && ligne.quantite){
        this.totalCommande += +ligne.prixUnitaire * +ligne.quantite
      }

    })

    this.searchArticleDto = {}
    this.quantite = ''
    this.codeArticle=''
    this.articleNotYetSelected = false
    this.findAllArticles()
  }

  selectArticle(article: ArticleResponseDto) {
    this.searchArticleDto =article
    this.codeArticle = article.codeArticle ? article.codeArticle : ''
    this.articleNotYetSelected = true
  }

  enregistrerCommande(): void {
    const commande = this.preparerCommande()
    // const commandrequest = {
    //   code: commande.codeCommande,
    //   dateCommande: commande.dateCommande,
    //   clientId: commande.client.clientId,
    //   entrepriseId: 0
    // }
    if(this.origin==='client'){
        this.cmdCltFrsService.enregistrerCommandeClient(commande as CommandeClientRequestDto)
          .subscribe({
            next: (cmd)=>{
              this.router.navigate(['commandesclient'])
            }, error:(error)=>{
              this.errorMsg = error.error.errors
            }
          })
    }else if(this.origin==='fournisseur'){
      this.cmdCltFrsService.enregistrerCommandeFournisseur(commande as CommandeFournisseurRequestDto)
        .subscribe({
          next: (cmd)=>{
            this.router.navigate(['commandesfournisseur'])
          }, error:(error)=>{
            this.errorMsg = error.error.errors
          }
        })
    }
  }

  private preparerCommande(): any{
    if(this.origin === 'client'){
      return {
        client: this.selectedClientFournisseur,
        code: this.codeCommande,
        dateCommande : new Date().getTime(),
        etatCommande: 'EN_PREPARATION',
        ligneCommandeClient: this.lignesCommande
      }}else if(this.origin === 'fournisseur'){
      return {
        client: this.selectedClientFournisseur,
        code: this.codeCommande,
        dateCommande : new Date().getTime(),
        etatCommande: 'EN_PREPARATION',
        ligneCommandeFournisseur: this.lignesCommande
      }}
    }

}
