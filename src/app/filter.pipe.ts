import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(value: any, sName:string): any {
    if(sName==""){
      return value;
    }
    const studentsarray:any[]=[];
    for(let i=0;i<value.length;i++){
      let nameName:string=value[i].name;
      if(nameName.startsWith(sName)){
        studentsarray.push(value[i]);
      }
    }
     return studentsarray;
  }

}
