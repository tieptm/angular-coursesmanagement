import { Component, OnInit, OnDestroy } from '@angular/core';
import { CourseService } from './../../services/course.service';
import { Subscription } from 'rxjs';
import { Course } from './../../models/course.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-course-add',
  templateUrl: './course-add.component.html',
  styleUrls: ['./course-add.component.css']
})
export class CourseAddComponent implements OnInit {

  public subscription : Subscription;
  public course : Course;

  constructor(
    public courseService : CourseService,
    public routerService : Router
  ) { }

  ngOnInit() {
    this.course = new Course();
  }

  ngOnDestroy() {
    if(this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  onAddCourse() {
    this.subscription = this.courseService.addCourse(this.course).subscribe(data => {
      if(data && data.id) {
        this.routerService.navigate(['courses']);
      }
    });
  }

}
