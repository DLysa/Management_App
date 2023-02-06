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
<<<<<<< HEAD
<<<<<<< HEAD
import {MatMenuModule} from "@angular/material/menu";
=======
<<<<<<< Updated upstream
=======
import {MatMenuModule} from "@angular/material/menu";
>>>>>>> Stashed changes
>>>>>>> b759d90 (Base fix)
=======
>>>>>>> 74919dd (app module configration fix)

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SidebarComponent,
<<<<<<< HEAD
<<<<<<< HEAD
    TableComponent,
=======
<<<<<<< Updated upstream
    TableComponent
=======
    TableComponent,
>>>>>>> Stashed changes
>>>>>>> b759d90 (Base fix)
=======
    TableComponent,
>>>>>>> 74919dd (app module configration fix)
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
<<<<<<< HEAD
<<<<<<< HEAD
        DragDropModule,
=======
<<<<<<< Updated upstream
        DragDropModule
=======
        DragDropModule,
>>>>>>> Stashed changes
>>>>>>> b759d90 (Base fix)
=======
        DragDropModule,
>>>>>>> 74919dd (app module configration fix)
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
