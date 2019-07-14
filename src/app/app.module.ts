import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import {AngularFireModule} from '@angular/fire'
import { environment } from 'src/environments/environment';
import { AngularFireAuthModule } from "@angular/fire/auth";
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireStorageModule } from 'angularfire2/storage';

import { TripleWordService } from './services/triple-word.service';
import { Toast } from '@ionic-native/toast/ngx';
import { ImagePicker } from '@ionic-native/image-picker/ngx';

import { MediaCapture, MediaFile, CaptureError, CaptureImageOptions } from '@ionic-native/media-capture/ngx';
import { Media, MediaObject } from '@ionic-native/media/ngx';
import { File } from '@ionic-native/file/ngx';

import { IonicStorageModule } from '@ionic/storage';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule, 
            IonicModule.forRoot(), 
            IonicStorageModule.forRoot(),
            AppRoutingModule,
            AngularFireModule.initializeApp(environment.firebase),
            AngularFireAuthModule,
            AngularFirestoreModule,
            AngularFireStorageModule,
            AngularFireDatabaseModule
            
  ],
  providers: [
    StatusBar,
    SplashScreen,
    ImagePicker,
    MediaCapture,
    Media,
    File,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    TripleWordService,
    Toast,
    
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
