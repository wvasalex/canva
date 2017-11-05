import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CanvaModule } from '../canva/canva.module';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    CanvaModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
