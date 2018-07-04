import { Component, OnInit, OnDestroy } from '@angular/core';
import { CourseService } from './../../services/course.service';
import { Subscription } from 'rxjs';
import { Course } from './../../models/course.model';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-course-add',
  templateUrl: './course-add.component.html',
  styleUrls: ['./course-add.component.css']
})
export class CourseAddComponent implements OnInit {

  public subscription : Subscription;
  public course : Course;
  public courseAddForm : FormGroup;

  constructor(
    public courseService : CourseService,
    public routerService : Router,
    private fb : FormBuilder
  ) { }

  ngOnInit() {
    this.course = new Course();
    this.createForm();
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

  createForm() {
    this.courseAddForm = this.fb.group({
      coursename: ['', Validators.required]
    })
  }

}
