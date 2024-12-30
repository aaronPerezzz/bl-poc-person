import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { provideHttpClient } from '@angular/common/http';
import { provideToastr } from 'ngx-toastr';
import { Constants } from './persons/utils/constants';
import { provideAnimations } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule
  ],
  providers: [
    provideHttpClient(),
    provideAnimations(),
    provideToastr({
      timeOut: Constants.SHOW_TIME,
      preventDuplicates: Constants.TRUE,
      closeButton: Constants.TRUE,
      positionClass: Constants.POSITION_TOAST
    })
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
