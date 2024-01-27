import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';

//imports de Material2
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatIconModule } from '@angular/material/icon';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatGridListModule } from '@angular/material/grid-list';
//forms components
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker'
import { MatDialogModule } from '@angular/material/dialog';
import { MatNativeDateModule, MAT_DATE_LOCALE, provideNativeDateAdapter } from '@angular/material/core'
import { MatSortModule }  from '@angular/material/sort'

import { AppRoutingModule, routingComponents } from './app-routing.module'
import { MainMenuComponent } from './main-menu/main-menu.component';
import { OptionsComponent } from './main-menu/options/options.component';
import { EVSEsListComponent, EVSEsDetailComponent, EVSEDeleteConfirmComponent } from './evse-list/evse-list.component';
import { ReportComponent } from './report/report.component';
import { TotalizerComponent } from './report/totalizer/totalizer.component';
import { TopFiveComponent } from './report/top-five/top-five.component';
import { TopFiveListComponent } from './report/top-five/top-five-list/top-five-list.component';
import { TotalizerListComponent } from './report/totalizer/totalizer-list/totalizer-list.component';
import {Component} from '@angular/core';
import {FormGroup, FormControl, ReactiveFormsModule, FormsModule} from '@angular/forms';
import {JsonPipe} from '@angular/common';


@NgModule({
   declarations: [
      AppComponent,
      routingComponents,
      MainMenuComponent,
      OptionsComponent,
      EVSEsListComponent,
      EVSEsDetailComponent,
      EVSEDeleteConfirmComponent,
      ReportComponent,
      TopFiveComponent,
      TopFiveListComponent,
      TotalizerComponent,
      TotalizerListComponent,
   ],
   imports: [
    FormsModule,
    JsonPipe,
    BrowserAnimationsModule,
    MatDialogModule,
    MatToolbarModule,
    MatMenuModule,
    MatSidenavModule,
    MatMenuModule,
    MatButtonModule,
    MatListModule,
    MatButtonToggleModule,
    AppRoutingModule,
    MatIconModule,
    MatExpansionModule,
    MatTableModule,
    HttpClientModule,
    MatCardModule,
    MatFormFieldModule,
    MatAutocompleteModule,
    MatSelectModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    ReactiveFormsModule,
    MatDividerModule,
    MatSnackBarModule,
    MatGridListModule,
    MatTableModule,
    MatSortModule,
   ],
   providers: [{provide: MAT_DATE_LOCALE, useValue: 'es-ES'}, provideNativeDateAdapter()],
   bootstrap: [
      AppComponent
   ]
})
export class AppModule { }
