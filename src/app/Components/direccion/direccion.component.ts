import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-direccion',
  templateUrl: './direccion.component.html',
  styles: []
})

export class DireccionComponent implements OnInit {

  @Output() emitEvent: EventEmitter<boolean> = new EventEmitter<boolean>();
  // estado: boolean = false;
  form: FormGroup;

  constructor(
    private fb: FormBuilder,

  ) {

    this.form = this.fb.group({
      valor: ['', []

      ],
      letra1: ['', [
        Validators.required,
        Validators.pattern(/^[A-Za-z\_\-\.\s\xF1\xD1]+$/)
      ]],
      numero1: ['', [
        Validators.required,
        Validators.pattern(/^([0-9])*$/)
      ]],
      letra2: ['', [
        Validators.required,
        Validators.pattern(/^[A-Za-z\_\-\.\s\xF1\xD1]+$/)
      ]],
      numero2: ['', [
        Validators.required, ,
        Validators.pattern(/^([0-9])*$/)
      ]],
      letra3: ['', [
        Validators.required, ,
        Validators.pattern(/^[A-Za-z\_\-\.\s\xF1\xD1]+$/)
      ]],
      numero3: ['', [
        Validators.required,
        Validators.pattern(/^([0-9])*$/)
      ]],
    });

  }

  ngOnInit() {
  }

  public function1(): boolean {
    const fResponse = this.form.valid;
    // this.estado = fResponse;
    // this.emitEvent.emit(fResponse);
    return fResponse;
  }

}
