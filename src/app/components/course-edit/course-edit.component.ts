import { Component, OnInit, OnDestroy } from '@angular/core';
import { CourseService } from './../../services/course.service';
import { Subscription } from 'rxjs';
import { Course } from './../../models/course.model';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-course-edit',
  templateUrl: './course-edit.component.html',
  styleUrls: ['./course-edit.component.css']
})
export class CourseEditComponent implements OnInit {

  public subscription : Subscription;
  public course : Course;
  public subscriptionParams : Subscription;

  constructor(
    public courseService : CourseService,
    public routerService : Router,
    public activatedRouteService : ActivatedRoute
  ) { }

  ngOnInit() {
    this.course = new Course();
    this.loadData();
  }

  onEditCourse() {
    this.subscription = this.courseService.updateCourse(this.course).subscribe(data => {
      if(data && data.id) {
        this.routerService.navigate(['courses']);
      }
    });
  }

  loadData() {
    this.subscriptionParams = this.activatedRouteService.params.subscribe((data : Params) => {
      this.subscription = this.courseService.getCourse(data['id']).subscribe((course : Course) => {
        this.course = course; 
      });
    });
  }

  ngOnDestroy() {
    if(this.subscription) {
      this.subscription.unsubscribe();
    }
    if(this.subscriptionParams) {
      this.subscription.unsubscribe();
    }
  }

}
