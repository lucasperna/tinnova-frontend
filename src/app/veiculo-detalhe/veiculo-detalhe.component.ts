import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Veiculo } from 'src/model/veiculo';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-veiculo-detalhe',
  templateUrl: './veiculo-detalhe.component.html',
  styleUrls: ['./veiculo-detalhe.component.scss']
})
export class VeiculoDetalheComponent implements OnInit {

  veiculo: Veiculo = { 
    id: '',
    veiculo: '',
    marca: '',
    ano: null,
    descricao: '',
    vendido: '',
    created: null,
    updated: null
  };
  isLoadingResults = true;
  constructor(private router: Router, private route: ActivatedRoute, private api: ApiService) { }


  ngOnInit() {
    this.getVeiculo(this.route.snapshot.params['id']);
  }

  getVeiculo(id) {
    this.api.getVeiculo(id)
      .subscribe(data => {
        this.veiculo = data;
        console.log(this.veiculo);
        this.isLoadingResults = false;
      });
  }

  deleteVeiculo(id) {
    this.isLoadingResults = true;
    this.api.deleteVeiculo(id)
      .subscribe(res => {
          this.isLoadingResults = false;
          this.router.navigate(['/veiculos']);
        }, (err) => {
          console.log(err);
          this.isLoadingResults = false;
        }
      );
  }

}
