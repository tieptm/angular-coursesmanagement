import { Component, OnInit, OnDestroy } from '@angular/core';
import { CourseService } from './../../services/course.service';
import { Subscription } from 'rxjs';
import { Course } from './../../models/course.model';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-course-edit',
  templateUrl: './course-edit.component.html',
  styleUrls: ['./course-edit.component.css']
})
export class CourseEditComponent implements OnInit {

  public subscription : Subscription;
  public course : Course;
  public subscriptionParams : Subscription;
  public courseEditForm : FormGroup;

  constructor(
    public courseService : CourseService,
    public routerService : Router,
    public activatedRouteService : ActivatedRoute,
    private fb : FormBuilder
  ) { }

  ngOnInit() {
    this.course = new Course();
    // this.createForm();
    this.loadData();
  }

  onEditCourse() {
    this.subscription = this.courseService.updateCourse(this.course).subscribe(data => {
      if(data && data.id) {
        this.routerService.navigate(['courses']);
      }
    });
    console.log(this.courseEditForm.value);
  }

  createForm() {
    this.courseEditForm = this.fb.group({
      id: [this.course.id],
      name: ['', Validators.required],
      description: ['',[Validators.required, Validators.minLength(20)]],
      price: ['', Validators.required]
    });
  }

  loadData() {
    this.subscriptionParams = this.activatedRouteService.params.subscribe((data : Params) => {
      this.subscription = this.courseService.getCourse(data['id']).subscribe((course : Course) => {
        this.course = course;
        // this.courseEditForm.setValue({
        //   id: course.id,
        //   name: course.name,
        //   description: course.description,
        //   price: course.price
        // });
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
