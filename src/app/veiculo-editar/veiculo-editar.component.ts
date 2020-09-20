import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-veiculo-editar',
  templateUrl: './veiculo-editar.component.html',
  styleUrls: ['./veiculo-editar.component.scss']
})
export class VeiculoEditarComponent implements OnInit {

  _id: String = '';
  veiculoForm: FormGroup;
  veiculo: String='';
  marca: String='';
  ano: number= null;
  descricao: String='';
  vendido: String='';
  created: Date = new Date();
  updated: Date= new Date();
  isLoadingResults = false;

  constructor(
    private router: Router, 
    private route: ActivatedRoute, 
    private api: ApiService, 
    private formBuilder: FormBuilder) { }

  ngOnInit() {
      this.getVeiculo(this.route.snapshot.params['id']);
      this.veiculoForm = this.formBuilder.group({
      'veiculo' : [null, Validators.required],
      'marca' : [null, [Validators.required, Validators.minLength(4)]],
      'ano' : [null, Validators.required],
      'descricao' : [null, Validators.required],
      'vendido' : [null, Validators.required],
      'created' : [null, Validators.required],
      'updated' : [null, Validators.required]
   });
   }

   getVeiculo(id) {
    this.api.getVeiculo(id).subscribe(data => {
      this._id = data._id;
      this.veiculoForm.setValue({
        veiculo: data.veiculo,
        marca: data.marca,
        ano: data.ano,
        descricao: data.descricao,
        vendido: data.vendido,
        created: data.created,
        updated: data.updated
      });
    });
  }
  
  updateVeiculo(form: NgForm) {
    this.isLoadingResults = true;
    this.api.updateVeiculo(this._id, form)
      .subscribe(res => {
          this.isLoadingResults = false;
          this.router.navigate(['/veiculo-detalhe/' + this._id]);
        }, (err) => {
          console.log(err);
          this.isLoadingResults = false;
        }
      );
  }

}
