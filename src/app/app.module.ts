import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './header/header.component';
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatIconModule} from "@angular/material/icon";
import {MatSidenavModule} from "@angular/material/sidenav";
import { SidebarComponent } from './sidebar/sidebar.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { TableComponent } from './table/table.component';
import {CdkDropList} from "@angular/cdk/drag-drop";
import {DragDropModule} from '@angular/cdk/drag-drop';
import {HttpClientModule} from "@angular/common/http";
import { TaskComponent } from './task/task.component';
import { ActionButtonsComponent } from './action-buttons/action-buttons.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { PopUpFormComponent } from './pop-up-form/pop-up-form.component';
import {MatDialogModule} from "@angular/material/dialog";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import { ShowPopUpFormComponent } from './show-pop-up-form/show-pop-up-form.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SidebarComponent,
    TableComponent,
    TaskComponent,
    ActionButtonsComponent,
    PopUpFormComponent,
    ShowPopUpFormComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatIconModule,
    MatSidenavModule,
    LayoutModule,
    MatButtonModule,
    MatListModule,
    CdkDropList,
    DragDropModule,
    HttpClientModule,
    FormsModule,
    MatDialogModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [PopUpFormComponent]
})
export class AppModule { }
