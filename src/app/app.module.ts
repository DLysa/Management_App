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
<<<<<<< Updated upstream
=======
import {MatMenuModule} from "@angular/material/menu";
>>>>>>> Stashed changes

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SidebarComponent,
<<<<<<< Updated upstream
    TableComponent
=======
    TableComponent,
>>>>>>> Stashed changes
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
<<<<<<< Updated upstream
        DragDropModule
=======
        DragDropModule,
>>>>>>> Stashed changes
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
