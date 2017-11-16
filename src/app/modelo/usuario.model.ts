export class Usuario{


    id: number;
    login: string;
    matricula: string;
    cpf: string;
    dataNascimento?: Date;

    constructor(public nome: string){

    }


}