import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(courses: any, term: any): any {
    if(term === undefined)
      return courses;
    return courses.filter(function(course) {
      return course.name.toLowerCase().includes(term.toLowerCase());
    })
  }
}
