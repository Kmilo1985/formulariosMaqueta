import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UsuarioComponent } from './Components/usuario/usuario.component';
import { ListComponent } from './Components/list/list.component';
import { TablaUserComponent } from './Components/tabla-user/tabla-user.component';
import { CrearComponent } from './Components/crear/crear.component';

const routes: Routes = [
  { path: 'usuario', component: UsuarioComponent },
  { path: 'crear', component: CrearComponent },
  { path: 'crear/:id', component: CrearComponent },

  { path: 'list', component: ListComponent },
  { path: '**', component: TablaUserComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
