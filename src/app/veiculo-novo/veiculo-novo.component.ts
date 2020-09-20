import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-veiculo-novo',
  templateUrl: './veiculo-novo.component.html',
  styleUrls: ['./veiculo-novo.component.scss']
})
export class VeiculoNovoComponent implements OnInit {
  
  veiculoForm: FormGroup;
  isLoadingResults = false;
  constructor(private router: Router, private api: ApiService, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
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

  addVeiculo(form: NgForm) {
    this.isLoadingResults = true;
    this.api.addVeiculo(form)
      .subscribe(res => {
          const id = res['_id'];
          this.isLoadingResults = false;
          this.router.navigate(['/veiculo-detalhe', id]);
        }, (err) => {
          console.log(err);
          this.isLoadingResults = false;
        });
  }

}
