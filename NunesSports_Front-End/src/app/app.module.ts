import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { ReactiveFormsModule } from '@angular/forms';

import { ProdutosService } from './Services/produtos.service';
import { ProdutosComponent } from './Components/produtos/produtos.component';

@NgModule({
    declarations: [
      AppComponent,
      ProdutosComponent
    ],
    imports: [
      BrowserModule,
      CommonModule,
      HttpClientModule,
      ReactiveFormsModule,
    ],
    providers: [HttpClientModule, ProdutosService],
    bootstrap: [AppComponent]
  })
  export class AppModule { }