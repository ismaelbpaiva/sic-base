import { SicService } from '../sic/sic.service';
import { Usuario } from '../modelo/usuario.model';
import { Observable } from 'rxjs/Rx';
import { MensagemService } from '../mensagens/mensagem.service';
import { TOKEN_USUARIO } from '../app.consts';
import { CanActivate, Router } from '@angular/router';
import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import { JwtHelper } from "angular2-jwt";


@Injectable()
export class LoginService implements CanActivate{

    private jwtHelper: JwtHelper = new JwtHelper();

    constructor(private http: Http, 
                private mensagens: MensagemService,
                private router: Router,
                private sicService: SicService){
    }


    /**
     * Indica se o usuário está logado e pode exibir o componente específico
     */
    canActivate(): boolean{
        if ( this.isLogado() ){
            return true;
        } else {
            this.mensagens.tratarErro("Acesso negado! Efetue Login!");
            this.router.navigate(['/login']);
            return false;
        }
    }

    /**
     * Logout do sistem
     */
    sair(){
        localStorage.removeItem(TOKEN_USUARIO);
        this.router.navigate(['/login']);
    }

    /**
     * Retorna o token JWT se existir
     */
    getToken(): string{
       var token = localStorage.getItem(TOKEN_USUARIO);
       return token;
    }

    /**
     * Retorna true se há um token válido 
     */
    isLogado(){
        return this.getToken() && !this.jwtHelper.isTokenExpired(this.getToken());
    }

    /**
     * Retorna o usuário logado ou null caso nenhum usuário esteja logado
     */
    getUsuarioLogado(): Usuario{
        if ( this.isLogado() ){
            let obj = this.jwtHelper.decodeToken(this.getToken());
            return new Usuario(obj.nome);
        } else {
            return null;
        }
    }

    /**
     * Executa o login usando JWT
     * 
     * @param login 
     * @param senha 
     */
    efetuarLogin(login: string, senha: string): Observable<boolean>{

        let usuario = { login: login, senha: senha, usarJwt: true  };

        return this.http.post(`${this.sicService.getAPI()}/acesso/publico/login`, usuario)
            .map( resposta => {
                if ( resposta.json().sucesso ){
                    let jwt = resposta.json().objeto;
                    localStorage.setItem(TOKEN_USUARIO, jwt);
                    return true;
                } else {
                    this.mensagens.tratarErro(resposta.json().mensagem);
                    return false;
                }
            });


    }




}