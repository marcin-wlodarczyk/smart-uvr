import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { NxWelcomeComponent } from './nx-welcome.component';
import { RouterModule } from '@angular/router';
import { appRoutes } from './app.routes';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { HomeComponent } from './home/home.component';
import {HttpClientModule} from "@angular/common/http";
import {MatAutocompleteModule} from "@angular/material/autocomplete";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatCardModule} from "@angular/material/card";
import {MatTableModule} from "@angular/material/table";
import {NgxMatTimepickerModule} from "ngx-mat-timepicker";

@NgModule({
  declarations: [AppComponent, NxWelcomeComponent, HomeComponent],
    imports: [
        BrowserModule,
        FlexLayoutModule,
        MatSlideToggleModule,
        HttpClientModule,
        MatAutocompleteModule,
        MatFormFieldModule,
        MatInputModule,
        MatIconModule,
        MatButtonModule,
        MatTableModule,
        RouterModule.forRoot(appRoutes, {initialNavigation: 'enabledBlocking'}),
        BrowserAnimationsModule,
        MatToolbarModule,
        ReactiveFormsModule,
        MatCardModule,
        NgxMatTimepickerModule,
        FormsModule,
    ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
