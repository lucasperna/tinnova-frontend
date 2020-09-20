import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { VeiculosComponent } from './veiculos/veiculos.component';
import { VeiculoDetalheComponent } from './veiculo-detalhe/veiculo-detalhe.component';
import { VeiculoNovoComponent } from './veiculo-novo/veiculo-novo.component';
import { VeiculoEditarComponent } from './veiculo-editar/veiculo-editar.component';

const routes: Routes = [
  {
    path: 'veiculos',
    component: VeiculosComponent,
    data: { title: 'Lista de Veículos' }
  },
  {
    path: 'veiculo-detalhe/:id',
    component: VeiculoDetalheComponent,
    data: { title: 'Detalhe do Veículo' }
  },
  {
    path: 'veiculo-novo',
    component: VeiculoNovoComponent,
    data: { title: 'Adicionar Veículo' }
  },
  {
    path: 'veiculo-editar/:id',
    component: VeiculoEditarComponent,
    data: { title: 'Editar o Veículo' }
  },
  { path: '',
    redirectTo: '/veiculos',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
