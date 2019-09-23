import { Component, OnInit, Input, Output } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { SelectItem } from 'primeng/api';
import { ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/Services/user.service';
import { UserModel } from 'src/app/model/userModel';
import Swal from 'sweetalert2';
import * as moment from 'moment';
import { Observable } from 'rxjs';
import { UTILIDADES } from '../constantes/constantes'
import { DireccionModel } from 'src/app/model/direccionModel';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css'],
})

export class UsuarioComponent implements OnInit {
  @Input() idUsuario: number;

  public idInputUsario: number;
  user = new UserModel();
  form: FormGroup;
  documentos: SelectItem[];
  public es = UTILIDADES.es;
  public Maxedad = UTILIDADES.OTROS;
  public minFecha: Date;
  public maxFecha: Date;


  public validarFecha = false;

  selectedCity1: City;
  // fecha
  value: Date;

  // lugar de nacimiento
  lugar1: SelectItem[];
  Asinglugar1: SelectItem[];

  selectedLugar1: Lugar;

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private _serviceUser: UserService,
  ) {
    this.form = this.fb.group({
      id: new FormControl(null),
      nombre: ['', [Validators.required, Validators.pattern(/^[A-Za-z\_\-\.\s\xF1\xD1]+$/)]],
      apellido: ['', [Validators.required, Validators.pattern(/^[A-Za-z\_\-\.\s\xF1\xD1]+$/)]],
      tipo_documento: ['', [Validators.required]],
      numero: ['', [Validators.required, Validators.pattern(/^([0-9])*$/)]
      ],
      fecha_expediccion: ['', [Validators.required]],
      fecha_nacimiento: ['', [Validators.required]],
      lugar_nacimiento: ['', [Validators.required]],
      edad: ['']

    });
    this.form.get('edad').disable();

    // this.form.valueChanges.subscribe( data =>{
    //   this.calcularFecha();
    // });

    this.documentos = [
      { label: 'Seleccione tipo del documento', value: null },
      { label: 'Cedula', value: 'NY' },
      { label: 'Tarjeta de identidad', value: 'RM' },
      { label: 'Pasaporte', value: 'LDN' }
    ];

    this.lugar1 = [
      { label: 'Seleccione el lugar de recidencia', value: null },
      { label: 'Medellin', value: 'M' },
      { label: 'Bogota', value: 'B' },
      { label: 'Otro', value: 'O' }
    ];

  }

  ngOnInit() {
    const id: any = this.route.snapshot.paramMap.get('id'); // leer id de el URL  PARA ESO SE USA ESTE METODO
    if (id !== 'nuevo') {
      this._serviceUser.consultarPorId(id).subscribe(resp => {
        this.user = resp;

        this.form.get('tipo_documento').setValue(this.user.tipo_documento);
        this.form.get('numero').setValue(this.user.numero);
        this.form.get('nombre').setValue(this.user.nombre);
        this.form.get('apellido').setValue(this.user.apellido);
        const fechaNac = new Date(this.user.fecha_nacimiento);
        this.form.get('fecha_nacimiento').setValue(fechaNac);
        const fechaExpe = new Date(this.user.fecha_expediccion);
        this.form.get('fecha_expediccion').setValue(fechaExpe);
        this.form.get('lugar_nacimiento').setValue(this.user.lugar_nacimiento);
        this.form.get('edad').setValue(this.user.edad);
      });
    }

  }

  guardarUser() {
    let user = new UserModel();

    // valido formulario
    if (this.form.valid) {
      // valido fecha
      this.calcularFecha();
      if (this.validarFecha) {
        // valido si se actualiza 
        this.user.tipo_documento = this.form.get('tipo_documento').value;
        this.user.numero = this.form.get('numero').value;
        this.user.nombre = this.form.get('nombre').value;
        this.user.apellido = this.form.get('apellido').value;
        let FormatoNac = new Date(this.form.get('fecha_nacimiento').value);
        this.user.fecha_nacimiento = this.form.get('fecha_nacimiento').value;
        this.user.fecha_expediccion = moment(this.form.get('fecha_expediccion').value).format('DD-MM-YYYY');
        this.user.lugar_nacimiento = this.form.get('lugar_nacimiento').value;
        this.user.edad = this.form.get('edad').value;

        if (this.user.id) {

          this._serviceUser.updateServUser(this.user).subscribe(resp => {
            Swal.fire({
              position: 'top-end',
              type: 'success',
              title: 'Actualizo satisfactoriamente',
              showConfirmButton: false,
              timer: 1500
            });
          });
        } else {

          user = this.user;
          this._serviceUser.crearServUsuario(user).subscribe(data => {

            this.user.id = data.id;
            Swal.fire({
              position: 'top-end',
              type: 'success',
              title: 'Guardo satisfactoriamente',
              showConfirmButton: false,
              timer: 1500
            });
          });
        }
      } else {
        Swal.fire({
          position: 'top-end',
          type: 'warning',
          title: 'Ingrese los una edad mayor a 18 años',
          showConfirmButton: false,
          timer: 1500
        });
      }
    } else {
      // this.calcularFecha();
      Swal.fire({
        position: 'top-end',
        type: 'warning',
        title: 'Ingrese los datos de registro solicitadas',
        showConfirmButton: false,
        timer: 1500
      });
    }
  }



  calcularFecha() {
    if (this.form.get('fecha_nacimiento').value) {
      const datos = this.form.get('fecha_nacimiento').value;
      const today = new Date();
      const age: number = today.getFullYear() - datos.getFullYear();
      if (age >= 18) {
        this.minFecha = datos;
        const formato = new Date(moment(today).format('YYYY-MM-DD'));
        this.maxFecha = new Date(formato);
        this.form.get('edad').setValue(age);
        this.validarFecha = true;
      } else {
        this.form.get('edad').setValue('');

        Swal.fire({
          position: 'top-end',
          type: 'warning',
          title: 'Debe ser mayor de edad',
          showConfirmButton: false,
          timer: 1500
        });

      }
    } else {
      Swal.fire({
        position: 'top-end',
        type: 'warning',
        title: 'iNGRESA UNA EDAD ADECUADA',
        showConfirmButton: false,
        timer: 1500
      });

    }
  }
  get aliases() {
    return this.form.get('form') as FormGroup;
  }

  get nombre() {
    return this.form.get('nombre');
  }

  get apellido() {
    return this.form.get('apellido');
  }

  get tipoDocumento() {
    return this.form.get('tipo_documento');
  }

  get numero() {
    return this.form.get('numero');
  }

  get fechaExpedicion() {
    return this.form.get('fecha_expediccion');
  }

  get fechaNacimiento() {
    return this.form.get('fecha_nacimiento');
  }

  get edad() {
    return this.form.get('edad');
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

