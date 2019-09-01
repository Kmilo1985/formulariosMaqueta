import { Component, OnInit, ɵConsole } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { SelectItem } from 'primeng/api';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css'],
})

export class UsuarioComponent implements OnInit {

  form: FormGroup;
  cities1: SelectItem[];
  selectedCity1: City;
  // fecha
  value: Date;

  // lugar de nacimiento
  lugar1: SelectItem[];
  selectedLugar1: Lugar;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      id: new FormControl,
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      tipo_documento: ['', Validators.required],
      numero: ['', Validators.required],
      fecha_expediccion: ['', Validators.required],
      fecha_nacimiento: ['', Validators.required],
      lugar_nacimiento: ['', Validators.required],
      edad: ['', Validators.required],
    });

    this.cities1 = [
      { label: 'Seleccione tipo del documento', value: null },
      { label: 'Cedula', value: { id: 1, name: 'Cedula', code: 'NY' } },
      { label: 'Tarjeta de identidad', value: { id: 2, name: 'Tarjeta de identidad', code: 'RM' } },
      { label: 'Pasaporte', value: { id: 3, name: 'Pasaporte', code: 'LDN' } }
    ];

    this.lugar1 = [
      { label: 'Seleccione el lugar de recidencia', value: null },
      { label: 'Medellin', value: { id: 1, name: 'Medellin', code: 'M' } },
      { label: 'Bogota', value: { id: 2, name: 'Bogota', code: 'B' } },
      { label: 'Otro', value: { id: 3, name: 'Otro', code: 'O' } }
    ];

  }

  ngOnInit() {
  }

  handleClick() {
    console.log(this.form.value);
  }



  guardarUser() {
    if (this.form.valid) {
      console.log(this.form.value);
    } else {

    }

  }

}
interface City {
  name: string;
  code: string;
}
interface Lugar {
  name: string;
  code: string;
}

