import { Component, OnInit } from '@angular/core';
import { UserModel } from 'src/app/model/userModel';

@Component({
  selector: 'app-crear',
  templateUrl: './crear.component.html',
  styleUrls: ['./crear.component.css']
})
export class CrearComponent implements OnInit {
  public inIdUsuario: number;
  constructor() { }

  ngOnInit() {

  }

  recibirIdUsario(event: UserModel): void {
    console.log(event.id);

  }

}
