import { EventEmitter, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { RetornoWebService } from '../modelo/retorno-web-service.model';
import { Observable } from 'rxjs/Rx';
import { Response } from '@angular/http';

@Injectable()
export class MensagemService {


    observable = new EventEmitter<string>();
    erro: boolean = false;

    constructor(private router: Router){}

    tratarErro(erro: Response | any){


        this.erro = true;
        if ( erro instanceof Response ){      
            if ( erro.status = 401 ){
                //Não autorizado
                this.observable.emit(`Acesso negado! Efetue login!`);
                this.router.navigate(['/login']);
            } else {
                this.observable.emit(`Erro código ${erro.status} ao acessar a URL ${erro.url} - ${erro.statusText}`);
            }
        } else if ( erro ){
            this.observable.emit(erro);
        } else {
            this.observable.emit("Erro não especificado");;
        }
        return Observable.throw(erro);

     }

     tratarResposta( resposta: RetornoWebService, mensagemSucesso?: string ){
         if ( resposta.sucesso ) {
             this.exibirMensagem(mensagemSucesso || resposta.mensagem);
         } else {
             this.tratarErro(resposta.mensagem);
         }
     }

     isErro(): boolean{
         return this.erro;
     }

     /**
      * 
      * @param mensagem Exibe a mensagem de informação 
      */
     exibirMensagem(mensagem: string){
        this.erro = false;
        this.observable.emit(mensagem);
     }

}