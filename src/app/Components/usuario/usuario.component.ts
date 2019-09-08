import { Component, OnInit, ɵConsole } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { SelectItem } from 'primeng/api';
import { ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/Services/user.service';
import { UserModel } from 'src/app/model/userModel';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css'],
})

export class UsuarioComponent implements OnInit {
  user = new UserModel();
  form: FormGroup;
  cities1: SelectItem[];
  asigCities1: SelectItem[];

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
      nombre: ['', [Validators.required,Validators.pattern(/^[A-Za-z\_\-\.\s\xF1\xD1]+$/)]],
      apellido: ['', [Validators.required,Validators.pattern(/^[A-Za-z\_\-\.\s\xF1\xD1]+$/)]],
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
    const id: any = this.route.snapshot.paramMap.get('id'); // leer id de el URL  PARA ESO SE USA ESTE METODO

    if (id !== 'nuevo') {
      this._serviceUser.consultarPorId(id).subscribe(resp => {
        this.user = resp;
        this.asigCities1 = this.cities1.filter(tipoD => {
          if (tipoD.label === this.user.tipo_documento) {
            return tipoD;
          }
        });
        this.form.get('tipo_documento').setValue(this.asigCities1);
        this.form.get('numero').setValue(this.user.numero);
        this.form.get('nombre').setValue(this.user.nombre);
        this.form.get('apellido').setValue(this.user.apellido);
        this.form.get('fecha_nacimiento').setValue(this.user.fecha_nacimiento);
        this.Asinglugar1 = this.lugar1.filter(lugarNacimiento => {
          if (lugarNacimiento.label === this.user.lugar_nacimiento) {
        console.log(lugarNacimiento);
        this.form.get('lugar_nacimiento').setValue(lugarNacimiento);
            return lugarNacimiento;
          }
        });
        console.log(this.Asinglugar1);
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
        this._serviceUser.updateServUser(this.user).subscribe(resp => {
          console.log('actualizo');
        });

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
        });
      }


    } else {

      console.log('guardo');
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

