import { Component, OnInit, OnDestroy } from '@angular/core';
import { CourseService } from './../../services/course.service';
import { Subscription } from 'rxjs';
import { Course } from './../../models/course.model';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';

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
    this.courseAddForm = this.fb.group({
      id: [this.course.id],
      name: ['', Validators.required],
      description: ['',[Validators.required, Validators.minLength(20)]],
      price: ['', Validators.required]
    });
  }

  onAddCourse() {
    this.subscription = this.courseService.addCourse(this.courseAddForm.value).subscribe(data => {
      if(data && data.id) {
        this.routerService.navigate(['courses']);
      }
      // console.log(this.courseAddForm.value);
      // console.log(data);
    });
  }
  
  ngOnDestroy() {
    if(this.subscription) {
      this.subscription.unsubscribe();
    }
  }

}
