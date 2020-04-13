import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HeaderComponent } from './markup/header/header.component';
import { FooterComponent } from './markup/footer/footer.component';
import {RouterModule} from '@angular/router';
import { SidebarComponent } from './markup/sidebar/sidebar.component';
import { ContentComponent } from './markup/content/content.component';
import {PostModule} from './post/post.module';
import {CategoryModule} from './category/category.module';
import { AppRoutingModule } from './app-routing.module';
import {UserModule} from './user/user.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AuthGuardService} from './common/service/auth-guard.service';
import {EditGuardService} from './common/service/edit-guard.service';
import { NotFoundComponent } from './markup/not-found/not-found.component';
import {AdminGuardService} from './common/service/admin-guard.service';
import {AdminModule} from './admin/admin.module';
import {AdminChildGuardService} from './common/service/admin-child-guard.service';
import {FormDataModule} from './form-data/form-data.module';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    SidebarComponent,
    ContentComponent,
    NotFoundComponent
  ],
    imports: [
        BrowserModule,
        RouterModule,
        PostModule,
        CategoryModule,
        AppRoutingModule,
        UserModule,
        FormsModule,
        ReactiveFormsModule,
        AdminModule,
        FormDataModule
    ],
  providers: [AuthGuardService, EditGuardService, AdminGuardService, AdminChildGuardService],
  bootstrap: [AppComponent]
})
export class AppModule { }
