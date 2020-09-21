import { Component, OnInit } from '@angular/core';
import { Veiculo } from 'src/model/veiculo';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-veiculos',
  templateUrl: './veiculos.component.html',
  styleUrls: ['./veiculos.component.scss']
})
export class VeiculosComponent implements OnInit {

  displayedColumns: string[] = [ 'veiculo', 'marca', 'ano', 'descricao', 'vendido', 'created', 'updated', 'acao'];
  dataSource: Veiculo[];
  isLoadingResults = true;
  
  constructor(private _api: ApiService) { }

  ngOnInit(): void {
    this._api.getVeiculos()
    .subscribe(res => {
      this.dataSource = res;
      console.log(this.dataSource);
      this.isLoadingResults = false;
    }, err => {
      console.log(err);
      this.isLoadingResults = false;
    });
  }

}
