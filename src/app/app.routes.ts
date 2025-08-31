import { Routes } from '@angular/router';

import {PageLogin} from './pages/page-login/page-login'
import {PageInscription} from './pages/page-inscription/page-inscription'
import {PageDashboard} from './pages/page-dashboard/page-dashboard';
import {PageStatistiques} from './pages/page-statistiques/page-statistiques';
import {PageArticle} from './pages/articles/page-article/page-article';
import {NouvelArticle} from './pages/articles/nouvel-article/nouvel-article';
import {PageMvtstk} from './pages/mvtstk/page-mvtstk/page-mvtstk';
import {PageClient} from './pages/client/page-client/page-client';
import {PageFournisseur} from './pages/fournisseur/page-fournisseur/page-fournisseur';
import {NouveauCltFrs} from './composants/nouveau-clt-frs/nouveau-clt-frs';
import {PageCmdCltFrs} from './pages/page-cmd-clt-frs/page-cmd-clt-frs';
import {NouvelleCmdCltFrs} from './composants/nouvelle-cmd-clt-frs/nouvelle-cmd-clt-frs';
import {PageCategories} from './pages/categories/page-categories/page-categories';
import {NouvelleCategory} from './pages/categories/nouvelle-category/nouvelle-category';
import {PageUtilisateur} from './pages/utilisateur/page-utilisateur/page-utilisateur';
import {NouvelUtilisateur} from './pages/utilisateur/nouvel-utilisateur/nouvel-utilisateur';
import {PageProfil} from './pages/profil/page-profil/page-profil';
import {ChangerMotDePasse} from './pages/profil/changer-mot-de-passe/changer-mot-de-passe';
import {PageRoles} from './pages/roles/page-roles/page-roles';
import {NouveauRole} from './pages/roles/nouveau-role/nouveau-role';
import {DashboardOverview} from './pages/dashboard-overview/dashboard-overview';
import {ApplicationGuard} from './services/guard/application-guard';
import {DetailArticle} from './pages/articles/detail-article/detail-article';
import {NouveauMouvement} from './pages/mvtstk/nouveau-mouvement/nouveau-mouvement';
import {DetailMouvement} from './pages/mvtstk/detail-mouvement/detail-mouvement';
export const routes: Routes = [
  {
    path: 'login',
    component : PageLogin
  },
  {
    path: 'inscrire',
    component: PageInscription
  },
  {
    path: '',
    component: PageDashboard,
    canActivate: [ApplicationGuard],
    children: [
      {
        path: '',
        component: DashboardOverview,
        canActivate: [ApplicationGuard]
      },
      {
        path: 'statistiques',
        component: PageStatistiques,
        canActivate: [ApplicationGuard]
      },
      {
        path: 'articles',
        component: PageArticle,
        canActivate: [ApplicationGuard]
      },
      {
        path: 'nouvelarticle/:idArticle',
        component: NouvelArticle,
        canActivate: [ApplicationGuard]
      },
      {
        path: 'nouvelarticle',
        component: NouvelArticle,
        canActivate: [ApplicationGuard]
      },
      {
        path: 'articles/detail/:id',
        component: DetailArticle,
        canActivate: [ApplicationGuard]
      },
      {
        path: 'mvtstk',
        component: PageMvtstk,
        canActivate: [ApplicationGuard]
      },
      {
        path: 'nouveaumouvement',
        component: NouveauMouvement,
        canActivate: [ApplicationGuard]
      },
      {
        path: 'nouveaumouvement/:id',
        component: NouveauMouvement,
        canActivate: [ApplicationGuard]
      },
      {
        path: 'detailmouvement/:id',
        component: DetailMouvement,
        canActivate: [ApplicationGuard]
      },
      {
        path: 'clients',
        component: PageClient,
        canActivate: [ApplicationGuard]
      },
      {
        path: 'nouveauclient',
        component: NouveauCltFrs,
        canActivate: [ApplicationGuard],
        data:{
          origin: 'client'
        }
      },
      {
        path: 'commandesclient',
        component: PageCmdCltFrs,
        canActivate: [ApplicationGuard],
        data:{
          origin: 'client'
        }
      },
      {
        path: 'nouvellecommandeclt',
        component: NouvelleCmdCltFrs,
        canActivate: [ApplicationGuard],
        data:{
          origin: 'client'
        }
      },
      {
        path: 'fournisseurs',
        component: PageFournisseur,
        canActivate: [ApplicationGuard]
      },
      {
        path: 'nouveaufournisseur',
        component: NouveauCltFrs,
        canActivate: [ApplicationGuard],
        data:{
          origin: 'fournisseur'
        }
      },
      {
        path: 'commandesfournisseur',
        component: PageCmdCltFrs,
        canActivate: [ApplicationGuard],
        data:{
          origin: 'fournisseur'
        }
      }
      ,
      {
        path: 'nouvellecommandefrs',
        component: NouvelleCmdCltFrs,
        canActivate: [ApplicationGuard],
        data:{
          origin: 'fournisseur'
        }
      }
      ,
      {
        path: 'categories',
        component: PageCategories,
        canActivate: [ApplicationGuard]
      }
      ,
      {
        path: 'nouvellecategorie',
        component: NouvelleCategory,
        canActivate: [ApplicationGuard]
      }
      ,
      {
        path: 'nouvellecategorie/:idCategory',
        component: NouvelleCategory,
        canActivate: [ApplicationGuard]
      }
      ,
      {
        path: 'utilisateurs',
        component: PageUtilisateur,
        canActivate: [ApplicationGuard]
      }
      ,
      {
        path: 'nouvelutilisateur',
        component: NouvelUtilisateur,
        canActivate: [ApplicationGuard]
      }
      ,
      {
        path: 'profil',
        component: PageProfil,
        canActivate: [ApplicationGuard]
      },
      {
        path: 'changermotdepasse',
        component: ChangerMotDePasse,
        canActivate: [ApplicationGuard]
      },
      {
        path: 'roles',
        component: PageRoles,
        canActivate: [ApplicationGuard]
      },
      {
        path: 'nouveaurole',
        component: NouveauRole,
        canActivate: [ApplicationGuard]
      },
      {
        path: 'nouveaurole/:id',
        component: NouveauRole,
        canActivate: [ApplicationGuard]
      },
      {
        path: 'nouvelutilisateur/:id',
        component: NouvelUtilisateur,
        canActivate: [ApplicationGuard]
      },
      {
        path: 'nouveauclient/:id',
        component: NouveauCltFrs,
        canActivate: [ApplicationGuard],
        data: {
          origin: 'client'
        }
      },
      {
        path: 'nouveaufournisseur/:id',
        component: NouveauCltFrs,
        canActivate: [ApplicationGuard],
        data: {
          origin: 'fournisseur'
        }
      }
    ]
  }
];
