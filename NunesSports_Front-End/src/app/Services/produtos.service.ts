import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProdutosService {
  apiUrl = 'http://localhost:5000/produto'

  constructor(private http: HttpClient) { }

  listar(): Observable<Produto[]> {
    const url = `${this.apiUrl}/listar`;
    return this.http.get<Produto[]>(url);
  }

  cadastrar(produto : Produto) : Observable<any> {
    const url = `${this.apiUrl}/cadastrar`;
    return this.http.post<Produto>(url, produto)
  }

  buscarCod(cod : string) : Observable<Produto> {
    const url = `${this.apiUrl}/buscar_cod`;
    return this.http.get<Produto>(url);
  }
  
  buscarNome(nome : string) : Observable<Produto[]> {
    const url = `${this.apiUrl}/buscar_nome`;
    return this.http.get<Produto[]>(url);
  }

  alterar(produto : Produto) : Observable<any> {
    const url = `${this.apiUrl}/alterar`;
    return this.http.put<Produto>(url, produto);
  }

  excluir(cod : string) : Observable<any> {
    const url = `${this.apiUrl}/excluir`;
    return this.http.delete<string>(url)
  }
}
