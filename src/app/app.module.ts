import { BrowserModule } from '@angular/platform-browser';

import { NgModule } from '@angular/core';

 

import { AppComponent } from './app.component';

import { FormsModule } from '@angular/forms';

import { LibraryComponent } from 'src/library/library.component';

 

@NgModule({

  declarations: [

    AppComponent,

    LibraryComponent

  ],

  imports: [

    BrowserModule,

    FormsModule

  ],

  providers: [],

  bootstrap: [AppComponent]

})

export class AppModule { }

 