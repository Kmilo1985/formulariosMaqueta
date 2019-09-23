import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UsuarioComponent } from './Components/usuario/usuario.component';
import { ListComponent } from './Components/list/list.component';

// primeNg
import { TableModule } from 'primeng/table';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { GalleriaModule } from 'primeng/galleria';
import { MessagesModule } from 'primeng/messages';
import { MessageModule } from 'primeng/message';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService } from 'primeng/api';
// import {InputTextModule} from 'primeng/inputtext';
import { TabViewModule } from 'primeng/tabview';
import { DropdownModule } from 'primeng/dropdown';
import { CalendarModule } from 'primeng/calendar';
import { ButtonModule } from 'primeng/button';
import { ContactoComponent } from './Components/contacto/contacto.component';
import { ReferenciaComponent } from './Components/referencia/referencia.component';
import { TablaUserComponent } from './Components/tabla-user/tabla-user.component';
import { DireccionComponent } from './Components/direccion/direccion.component';
import { InputTextModule } from 'primeng/inputtext';
import { CrearComponent } from './Components/crear/crear.component';
import { PanelModule } from 'primeng/panel';
import { FieldsetModule } from 'primeng/fieldset';
import { DynamicDialogModule } from 'primeng/dynamicdialog';
import { DialogModule } from 'primeng/dialog';


@NgModule({
  declarations: [
    AppComponent,
    UsuarioComponent,
    ListComponent,
    ContactoComponent,
    ReferenciaComponent,
    TablaUserComponent,
    DireccionComponent,
    CrearComponent,
  ],
  imports: [
    InputTextModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    TableModule,
    GalleriaModule,
    MessagesModule,
    MessageModule,
    ConfirmDialogModule,
    TabViewModule,
    DropdownModule,
    CalendarModule,
    ButtonModule,
    PanelModule,
    FieldsetModule,
    DynamicDialogModule,
    DialogModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
