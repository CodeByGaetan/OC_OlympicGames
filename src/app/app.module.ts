import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { HeaderComponent } from './pages/components/header/header.component';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { PieChartComponent } from './pages/components/pie-chart/pie-chart.component';
import { DetailComponent } from './pages/detail/detail.component';
import { LineChartComponent } from './pages/components/line-chart/line-chart.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NotFoundComponent,
    HeaderComponent,
    PieChartComponent,
    DetailComponent,
    LineChartComponent
  ],
  imports: [BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgxChartsModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
