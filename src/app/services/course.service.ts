import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Course } from './../models/course.model';
import { Observable } from 'rxjs';

@Injectable()
export class CourseService {

  public API : string = 'http://localhost:3000/courses';

  constructor(public httpClient : HttpClient) { }

  getCourses() : Observable<Course[]>{
    return this.httpClient.get<Course[]>(this.API);
  }

  getCourse(id : number) : Observable<Course> {
    return this.httpClient.get<Course>(`${this.API}/${id}`);
  }

  addCourse(course : Course) : Observable<Course> {
    return this.httpClient.post<Course>(this.API, course);
  }

  updateCourse(course : Course) : Observable<Course> {
    return this.httpClient.put<Course>(`${this.API}/${course.id}`, course);
  }

  deleteCourse(id : number) : Observable<Course> {
    //return this.httpClient.delete(this.API + '/' + id);
    return this.httpClient.delete<Course>(`${this.API}/${id}`);
  }
}
