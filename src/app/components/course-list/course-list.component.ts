import { Component, OnInit, OnDestroy } from '@angular/core';
import { CourseService } from './../../services/course.service';
import { Subscription } from 'rxjs';
import { Course } from './../../models/course.model';
import { FilterPipe } from './../../pipes/filter.pipe';

@Component({
  selector: 'app-course-list',
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.css']
})
export class CourseListComponent implements OnInit {

  public subscription : Subscription;
  public courses : Course[] = [];

  constructor(public courseService : CourseService) { }

  ngOnInit() {
    this.subscription = this.courseService.getCourses().subscribe((data : Course[]) => {
      this.courses = data;
    }); 
  }

  ngOnDestroy() {
    if(this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  onDeleteCourse(id : number) {
    this.subscription = this.courseService.deleteCourse(id).subscribe((data : Course) => {
      this.updateDataAfterDelete(id);
    }); 
  }

  updateDataAfterDelete(id : number) {
    for (var i = 0; i < this.courses.length; i++) {
      if(this.courses[i].id == id) {
        this.courses.splice(i, 1);
        break;
      }
    }
  }

}
