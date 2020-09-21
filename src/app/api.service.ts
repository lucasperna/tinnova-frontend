import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Veiculo } from 'src/model/veiculo';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

const apiUrl = 'http://localhost:8080/veiculos';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  getVeiculos (): Observable<Veiculo[]> {
    return this.http.get<Veiculo[]>(apiUrl)
      .pipe(
        tap(veiculos => console.log('leu os veículos')),
        catchError(this.handleError('getVeiculos', []))
      );
  }

  getVeiculo(id: number): Observable<Veiculo> {
    const url = `${apiUrl}/${id}`;
    return this.http.get<Veiculo>(url).pipe(
      tap(_ => console.log(`leu o veiculo id=${id}`)),
      catchError(this.handleError<Veiculo>(`getVeiculo id=${id}`))
    );
  }

  addVeiculo (veiculo): Observable<Veiculo> {
    return this.http.post<Veiculo>(apiUrl, veiculo, httpOptions).pipe(
      // tslint:disable-next-line:no-shadowed-variable
      tap((veiculo: Veiculo) => console.log(`adicionou o veiculo com w/ id=${veiculo.id}`)),
      catchError(this.handleError<Veiculo>('addVeiculo'))
    );
  }

  updateVeiculo(id, veiculo): Observable<any> {
    const url = `${apiUrl}/${id}`;
    return this.http.put(url, veiculo, httpOptions).pipe(
      tap(_ => console.log(`atualiza o veiculo com id=${id}`)),
      catchError(this.handleError<any>('updateVeiculo'))
    );
  }

  deleteVeiculo(id): Observable<Veiculo> {
    const url = `${apiUrl}/${id}`;

    return this.http.delete<Veiculo>(url, httpOptions).pipe(
      tap(_ => console.log(`remove o veiculo com id=${id}`)),
      catchError(this.handleError<Veiculo>('deleteVeiculo'))
    );
  }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      console.error(error);

      return of(result as T);
    };
  }
}
