import { Component, OnInit, forwardRef, Output, EventEmitter } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { INgxMyDpOptions, IMyDateModel } from "ngx-mydatepicker";

@Component({
  selector: 'cia-datepicker',
  templateUrl: './datepicker.component.html',
  styleUrls: ['./datepicker.component.css'],
  providers: [
    { provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DatepickerComponent),
      multi: true
    }
  ]
})
export class DatepickerComponent implements OnInit, ControlValueAccessor {

  /**
   * A data selecionada
   */
  dateModel: any;
  disabled: boolean = false;

  /**
   * Opções do ngx-mydatepicker
   */
  dateOptions: INgxMyDpOptions = {
       dateFormat: 'dd/mm/yyyy',
  };

  /**
   * Função que será disparada para avisar ao framework quando o valor do componente mudar
   */
  onChange: any;

  @Output() changeEmitter = new EventEmitter<Date>();

  constructor() { }

  ngOnInit() {
  }

  writeValue(obj: any): void{
    if ( obj ){
      let date: Date;
      if ( obj instanceof Date){
        date = obj;
      } else {
        date = new Date(obj);
      }
      
      this.dateModel = { date: { year: date.getFullYear(), month: date.getMonth()+1, day: date.getDate()} };
      this.changeEmitter.emit(this.dateModel.jsdate);
    }
  }

  registerOnChange(fn: any): void{
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void{
  }

  setDisabledState?(isDisabled: boolean): void{
    this.disabled = isDisabled;
  }
  
  onDateChanged(event: IMyDateModel): void {
      this.dateModel = event;
      this.onChange(this.dateModel.jsdate);
  }

}
