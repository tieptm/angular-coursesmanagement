import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { CourseListComponent } from './components/course-list/course-list.component';
import { CourseAddComponent } from './components/course-add/course-add.component';
import { CourseEditComponent } from './components/course-edit/course-edit.component';
import { CoursesComponent } from './components/courses/courses.component';
import { CourseService } from './services/course.service';
import { LoginComponent } from './components/login/login.component';
import { AuthGuard } from './services/guards/auth.guard';
import { FilterPipe } from './pipes/filter.pipe';

const appRoutes : Routes = [
  {
    path : '',
    component : LoginComponent
  },
  {
    path : 'courses',
    component : CoursesComponent,
    canActivate : [AuthGuard],
    children : [
      {
        path : '',
        component : CourseListComponent
      },
      {
        path : ':id/edit',
        component : CourseEditComponent
      },
      {
        path : 'add',
        component : CourseAddComponent
      },
    ]
  },
  {
    path : 'login',
    component : LoginComponent
  }
];

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    CourseListComponent,
    CourseAddComponent,
    CourseEditComponent,
    CoursesComponent,
    LoginComponent,
    FilterPipe
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot(appRoutes),
    ReactiveFormsModule
  ],
  providers: [
    CourseService,
    AuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
