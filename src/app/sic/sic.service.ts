import { MensagemService } from '../mensagens/mensagem.service';
import { Injectable } from '@angular/core';


@Injectable()
export class SicService {


    private api: string = undefined;

    constructor(private mensagemService: MensagemService){}


    public setAPI(api: string){
        this.api = api;
    }

    public getAPI(): string{
        if ( !this.api ){
            this.mensagemService.exibirMensagem("A API de backend não foi setada no SicService. Faça isso no bootstrap da aplicação");
        }
        return this.api;
    }


}