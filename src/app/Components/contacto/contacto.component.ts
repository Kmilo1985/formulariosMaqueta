import { Component, OnInit, ViewChild  } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { DireccionComponent } from '../direccion/direccion.component';
@Component({
  selector: 'app-contacto',
  templateUrl: './contacto.component.html',
  styles: []
})
export class ContactoComponent implements OnInit {
  form: FormGroup;

  constructor(
    // private _serviceDireccion: Ser,
    private fb: FormBuilder) {
    this.form = this.fb.group({
      id: new FormControl,
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
    });

  }

  ngOnInit() {
  }
  eventoData() {

  }
  listaDireciones(){
    
  }

}
