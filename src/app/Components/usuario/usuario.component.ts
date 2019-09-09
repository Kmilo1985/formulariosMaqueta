import { Component, OnInit, ɵConsole } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { SelectItem } from 'primeng/api';
import { ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/Services/user.service';
import { UserModel } from 'src/app/model/userModel';
import Swal from 'sweetalert2';
import * as moment from 'moment';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css'],
})

export class UsuarioComponent implements OnInit {
  user = new UserModel();
  form: FormGroup;
  cities1: SelectItem[];

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
    private _serviceUser: UserService
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
      edad: ['', [Validators.required, Validators.pattern(/^([0-9])*$/)]]

    });

    this.cities1 = [
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
        const asigCities1 = this.cities1.filter(tipoD => {
          if (tipoD.label === this.user.tipo_documento) {
            return tipoD;


          }
        });
        this.form.get('tipo_documento').setValue(asigCities1[0].value);
        this.form.get('numero').setValue(this.user.numero);
        this.form.get('nombre').setValue(this.user.nombre);
        this.form.get('apellido').setValue(this.user.apellido);
        this.form.get('fecha_nacimiento').setValue(this.user.fecha_nacimiento);
        const Asinglugar1 = this.lugar1.filter(lugarNacimiento => {
          if (lugarNacimiento.label === this.user.lugar_nacimiento) {
            console.log(lugarNacimiento);
            return lugarNacimiento;
          }
        });
        this.form.get('lugar_nacimiento').setValue(Asinglugar1[0].value);
        this.form.get('fecha_expediccion').setValue(this.user.fecha_expediccion);
        this.form.get('edad').setValue(this.user.edad);

      });
    }

  }

  handleClick() {
    console.log(this.form.value);
  }



  guardarUser() {
    if (this.form.valid) {
      
      if (this.user.id) {
        console.log('actualizo');
        console.log(this.user);


        // this._serviceUser.updateServUser(this.user).subscribe(resp => {
        //   // Swal.fire({
        //   //   position: 'top-end',
        //   //   type: 'success',
        //   //   title: 'Actualizo satisfactoriamente',
        //   //   showConfirmButton: false,
        //   //   timer: 1500
        //   // });
        // });

      } else {
        const userData = new UserModel();

        userData.tipo_documento = this.form.get('tipo_documento').value;
        userData.numero = this.form.get('numero').value;
        userData.nombre = this.form.get('nombre').value;
        userData.apellido = this.form.get('apellido').value;
        userData.fecha_nacimiento = this.form.get('fecha_nacimiento').value;
        userData.lugar_nacimiento = this.form.get('lugar_nacimiento').value;
        userData.fecha_expediccion = this.form.get('fecha_expediccion').value;
        userData.edad = this.form.get('edad').value;
        console.log(userData);
        this._serviceUser.crearServUsuario(userData).subscribe(data => {
          console.log('guardo');
          this.user.tipo_documento = data.tipo_documento;
          this.user.id = data.id;
          this.user.nombre = data.nombre;
          this.user.apellido = data.apellido;
          this.user.fecha_nacimiento = data.fecha_nacimiento;
          this.user.lugar_nacimiento = data.lugar_nacimiento;
          this.user.fecha_expediccion = data.fecha_expediccion;
          this.user.edad = data.edad;

          Swal.fire({
            position: 'top-end',
            type: 'success',
            title: 'GUardo satisfactoriamente',
            showConfirmButton: false,
            timer: 1500
          });
        });
      }


    } else {
      this.calcularFecha();
      Swal.fire({
        position: 'top-end',
        type: 'warning',
        title: 'Ingrese los datos de registro solicitadas',
        showConfirmButton: false,
        timer: 1500
      });
    }

  }

  calcularFecha(){
    const fehcMoment = moment('9/8/2019', 'MM/DD/YYYY').add(1, 'day');
  const fechaActual = new Date();
  console.log(fehcMoment);
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

