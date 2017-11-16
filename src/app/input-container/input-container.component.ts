import { Component, OnInit, Input, ContentChild, AfterContentInit } from '@angular/core';
import { NgModel, FormControlName } from '@angular/forms';

@Component({
  selector: 'cia-input-container',
  templateUrl: './input-container.component.html'
})
export class InputContainerComponent implements OnInit, AfterContentInit {


  @Input() label: string;
  @Input() mensagemErro: string;
  input: any;

  @ContentChild(NgModel) model: NgModel;
  @ContentChild(FormControlName) control: FormControlName;

  constructor() { }

  ngOnInit() {
  }



  valido(): boolean {
    return this.input.valid && ( this.input.dirty || this.input.touched );
  }

  invalido(): boolean {
    return this.input.invalid && ( this.input.dirty || this.input.touched );
  }

  ngAfterContentInit(){
    this.input = this.model || this.control;
    if ( !this.input ){
      throw new Error("O componenente input-container precisa obrigatoriamente de um input com ngModel ou formControlName dentro dele");
    }
  }

}
