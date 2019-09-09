import { Component, OnInit } from '@angular/core';
import { UserModel } from 'src/app/model/userModel';
import { UserService } from 'src/app/Services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-tabla-user',
  templateUrl: './tabla-user.component.html',
  styles: []
})
export class TablaUserComponent implements OnInit {
  public listData: UserModel[] = [];

  constructor(
    private _serviceUser: UserService
  ) { }

  ngOnInit() {
    this.listarUser();
  }

  handleClick() {
    alert('entro');
  }
  listarUser() {
    this._serviceUser.listarUsuario().subscribe(data => {
      console.log(data);
      this.listData = data;
    });
  }
  eliminarUser(user: UserModel) {

    Swal.fire({
      title: 'Are you sure?',
      text: "Desea elminar este registro",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, Eliminar!'
    }).then((result) => {
      if (result.value) {
        Swal.fire(
          'Deleted!',
          'Se elimino correctamente',
          'success'
        );
        this._serviceUser.eliminarUser(user).subscribe(data => {
          console.log('elimino');
          this.listarUser();
        });

      }
    });

  }
}
