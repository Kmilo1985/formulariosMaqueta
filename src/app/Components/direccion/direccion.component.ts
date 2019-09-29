import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { DireccionModel } from 'src/app/model/direccionModel';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-direccion',
  templateUrl: './direccion.component.html',
  styles: []
})

export class DireccionComponent implements OnInit {

  @Output() direccionOut = new EventEmitter<DireccionModel>();
  // estado: boolean = false;
  form: FormGroup;
  public direccionData = new DireccionModel();

  constructor(
    private fb: FormBuilder,

  ) {

    this.form = this.fb.group({
      id: [null],
      formatoDireccion: [null],
      user_id: [null],
      barrio: ['', [
        Validators.required,
        Validators.pattern(/^[A-Za-z\_\-\.\s\xF1\xD1]+$/)
      ]],
      tipo: ['', [
        Validators.required, ,
        Validators.pattern(/^([0-9])*$/)//solo numeros
      ]],
      via: ['', [
        Validators.required, ,
        Validators.pattern(/^[A-Za-z\_\-\.\s\xF1\xD1]+$/)
      ]],
      letra: ['', [
        Validators.required,
        Validators.pattern(/^[A-Za-z\_\-\.\s\xF1\xD1]+$/)
      ]],
      letra2: ['', [
        Validators.required,
        Validators.pattern(/^[A-Za-z\_\-\.\s\xF1\xD1]+$/)
      ]],
      letra3: ['', [
        Validators.required,
        Validators.pattern(/^[A-Za-z\_\-\.\s\xF1\xD1]+$/)
      ]],
      observaciones: ['', [
        Validators.required,
        Validators.pattern(/^[A-Za-z\_\-\.\s\xF1\xD1]+$/)
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

  guardarDireccion() {
    if (this.form.valid) {
      // console.log(this.form.value);
      this.direccionData.barrio = this.form.get('tipo').value;
      this.direccionData.tipo = this.form.get('tipo').value;
      this.direccionData.via = this.form.get('via').value;
      this.direccionData.letra = this.form.get('letra').value;
      this.direccionData.letra2 = this.form.get('letra2').value;
      this.direccionData.letra3 = this.form.get('letra3').value;
      this.direccionData.observaciones = this.form.get('observaciones').value;

      this.direccionData.formatoDireccion =
      this.direccionData.barrio + this.direccionData.tipo + this.direccionData.via + this.direccionData.letra
      + '#' + this.direccionData.letra2 + this.direccionData.letra3 + this.direccionData.observaciones;
      // console.log( this.direccionData.formatoDireccion);

      this.direccionOut.emit(this.direccionData);

    } else {
      Swal.fire({
        position: 'top-end',
        type: 'warning',
        title: 'Ingrese datos',
        showConfirmButton: false,
        timer: 1500
      });

    }

  }
  // get de direccion de

  get aliases() {
    return this.form.get('form') as FormGroup;
  }

  get barrio() {
    return this.form.get('barrio');
  }

  get tipo() {
    return this.form.get('tipo');
  }

  get via() {
    return this.form.get('via');
  }

  get letra() {
    return this.form.get('letra');
  }

  get letra2() {
    return this.form.get('letra2');
  }
  get letra3() {
    return this.form.get('letra3');
  }

  get observaciones() {
    return this.form.get('observaciones');
  }
}
