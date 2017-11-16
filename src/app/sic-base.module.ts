import { LoginService } from './login/login.service';
import { MensagemService } from './mensagens/mensagem.service';
import { SicService } from './sic/sic.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [
    SicService,
    MensagemService,
    LoginService
  ],
  bootstrap: [AppComponent]
})
export class SicBaseModule { }
