import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EVSEsListComponent } from './evse-list/evse-list.component';
import { MainMenuComponent } from './main-menu/main-menu.component';
import { ReportComponent } from './report/report.component';
import { TopFiveListComponent } from './report/top-five/top-five-list/top-five-list.component';
import { TotalizerListComponent } from './report/totalizer/totalizer-list/totalizer-list.component';

//TODO: falta agregar el routing a 404
const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: MainMenuComponent },
  { path: 'EVSEs', component: EVSEsListComponent },
  { path: 'top-5', component: ReportComponent, data: { mode: 'top-5' } },
  { path: 'totalizer', component: ReportComponent, data: { mode: 'totalizer' } },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ],
  declarations: []
})
export class AppRoutingModule { }

//buena práctica según el indio:
export const routingComponents = [MainMenuComponent,
  EVSEsListComponent,
]