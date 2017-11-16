import { ComboboxChanged } from './combobox-changed.model';
import { Component, OnInit, Input, forwardRef, Output, EventEmitter } from '@angular/core';
import { ComboboxModel } from './combobox-model';
import { ComboboxService } from './combobox.service';
import { Observable } from 'rxjs/Observable';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'cia-combobox',
  templateUrl: './combobox.component.html',
  styleUrls: ['./combobox.component.css'],
  providers: [
    { provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ComboboxComponent),
      multi: true
    }
  ]
})
export class ComboboxComponent implements OnInit, ControlValueAccessor {

  /**
  * Obtém uma referência para o ID do objeto
  **/
  @Input() id: string;
  /**
  * Clase que será listada pelo combobox
  **/
  @Input() classe: string;
  /**
   * Filtros (opcional) que serão realizados para listar no combobox
   */
  @Input() filtros: string;
  /**
   * Caso o componente queira se registrar para ouvir mudanças em um outro combobox, usar 
   * aqui uma referência para o outro combobox. Serve para encadear combos,para carregar
   *  município / bairro por exemplo.
   */
  @Input() atach: ComboboxComponent;

  @Output() changeEmitter = new EventEmitter<ComboboxChanged>();
  /**
  * Valor preenchido do combobox
  **/
  valor: any;
  /**
  * Itens que serão listados no combo
  **/
  itens: Observable<ComboboxModel[]>;
  /**
  * Função que será chamada ao mudar o valor do combobox
  **/
  onChange: any;

  constructor(private service: ComboboxService) { }

  ngOnInit() {    

    if ( this.atach ){      
      this.atach.changeEmitter.subscribe( comboboxModel => {
        if ( comboboxModel.valor ){
          let filtroGerado = this.filtros.replace("{"+this.atach.id+"}", comboboxModel.valor);
          this.filtrar(filtroGerado);
        }
      });
    } else {
      this.filtrar(this.filtros);
    }
  }

  filtrar(filtro: string) {
    this.itens = this.service.listar(this.classe, filtro);
  }

  writeValue(obj: any): void{
    this.valor = obj;    
    this.changeEmitter.emit(new ComboboxChanged(this.id, this.valor));
  }

  registerOnChange(fn: any): void{
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void{
  }

  setDisabledState?(isDisabled: boolean): void{
  }

  comboboxChanged(){
    this.changeEmitter.emit(new ComboboxChanged(this.id, this.valor));
    this.onChange(this.valor);
  }


}
