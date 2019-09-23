import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { UTILIDADES } from '../constantes/constantes';
import Swal from 'sweetalert2';
import { DireccionModel } from 'src/app/model/direccionModel';
import { DireccionService } from 'src/app/Services/direccion.service';
@Component({
  selector: 'app-contacto',
  templateUrl: './contacto.component.html',
  styles: []
})
export class ContactoComponent implements OnInit {
  @Input() idUsuarioContac: number;
  formDirec: FormGroup;
  public direccionVer: boolean;
  public es = UTILIDADES.es;
  public direccionModel = new DireccionModel();
  public listaDirecionesUser: DireccionModel[] = [];

  constructor(
    // private _serviceDireccion: Ser,
    private _direcionService: DireccionService,
    private fb: FormBuilder) {
    this.formDirec = this.fb.group({
      formatoDireccion: ['', null],
      telefono: ['', Validators.required],
    });

    this.formDirec.get('formatoDireccion').disable();


  }

  ngOnInit() {
    this.traerDirecciones();
  }
  // get de el formulario

  get aliases() {
    return this.formDirec.get('formDirec') as FormGroup;
  }

  get letra1() {
    return this.formDirec.get('formatoDireccion');
  }

  get numero1() {
    return this.formDirec.get('telefono');
  }

  traerDirecciones() {
    this._direcionService.listarDireccionesUser().subscribe(data => {
      this.listaDirecionesUser = data;
    })
  }

  listaDireciones(event: DireccionModel) {
    // Muestro la direccion creada
    this.formDirec.get('formatoDireccion').setValue(event.formatoDireccion);
    this.direccionModel = event;
    this.direccionModel.user_id = 1;
    // this.formDirec.get('formatoDireccion').setValidators.required(null)
    Swal.fire({
      position: 'top-end',
      type: 'warning',
      title: 'Debes Completa el formulario',
      showConfirmButton: false,
      timer: 1500
    });

  }

  guardarDireccion() {
    // console.log(this.direccionModel);
    if (this.formDirec.get('telefono').value) {


      if (this.direccionModel.formatoDireccion) {
        console.log(this.direccionModel);
        this._direcionService.guardarDireccionUser(this.direccionModel).subscribe(data => {

          Swal.fire({
            position: 'center',
            type: 'success',
            title: 'Guardo satisfacoriamente',
            showConfirmButton: false,
            timer: 1500
          });
        });


      } else {
        Swal.fire({
          position: 'top-end',
          type: 'warning',
          title: 'Debes Agregar la direccion',
          showConfirmButton: false,
          timer: 1500
        });

      }

    } else {

      Swal.fire({
        position: 'top-end',
        type: 'warning',
        title: 'Ingresa los datos del formulario',
        showConfirmButton: false,
        timer: 1500
      });

    }
  }

  showDialog() {
    this.direccionVer = true;
  }

}
