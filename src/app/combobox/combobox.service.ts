import { SicService } from '../sic/sic.service';
import { MensagemService } from '../mensagens/mensagem.service';
import { Injectable }  from '@angular/core';
import { Http  } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Observable } from 'rxjs/Observable';
import { ComboboxModel } from './combobox-model';

@Injectable()
export class ComboboxService{


    constructor(private httpService: Http, 
                private mensagemService: MensagemService,
                private sicService: SicService  ){
    }

    listar(classe : string, filtros?: string ) : Observable<ComboboxModel[]>{
      return this.httpService.get(`${this.sicService.getAPI()}/publico/combobox/${classe}${filtros?"?filtros="+filtros:""}`)
             .map( resposta => resposta.json().listaObjetos ) 
             .catch( this.mensagemService.tratarErro );
    }

}
