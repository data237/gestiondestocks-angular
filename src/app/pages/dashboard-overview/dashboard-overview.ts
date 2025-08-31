import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-dashboard-overview',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './dashboard-overview.html',
  styleUrls: ['./dashboard-overview.css']
})
export class DashboardOverview {
  
  // Dashboard statistics
  totalProducts = 245;
  totalClients = 89;
  totalSuppliers = 34;
  totalOrders = 156;
  
  // Recent activities
  recentActivities = [
    { type: 'product', action: 'Ajout', item: 'Ordinateur portable HP', time: '2 minutes' },
    { type: 'order', action: 'Commande', item: 'CMD-2025-001', time: '15 minutes' },
    { type: 'client', action: 'Nouveau client', item: 'Jean Dupont', time: '1 heure' },
    { type: 'stock', action: 'Mouvement stock', item: 'Souris optique', time: '2 heures' },
    { type: 'supplier', action: 'Fournisseur', item: 'TechCorp SARL', time: '3 heures' }
  ];
  
  // Quick stats for charts
  monthlyStats = {
    sales: [65, 78, 90, 81, 56, 85, 92],
    orders: [28, 35, 42, 38, 29, 41, 45],
    products: [12, 19, 15, 22, 18, 25, 21]
  };
  
  // Low stock alerts
  lowStockItems = [
    { name: 'Clavier mécanique', stock: 5, minStock: 10 },
    { name: 'Écran 24 pouces', stock: 3, minStock: 8 },
    { name: 'Câble USB-C', stock: 7, minStock: 15 }
  ];

  constructor() {}
}
