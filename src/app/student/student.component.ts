import { Component,OnInit} from '@angular/core';
import { FormBuilder, FormGroup,Validators } from '@angular/forms';
import { ApiService } from '../api.service';
import { studentdata } from './student.model';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css']
})
export class StudentComponent implements OnInit {
    showadd!:boolean;
    showupdate!:boolean;
    studentform!:FormGroup;
    studentmodelobj:studentdata=new studentdata;
    allstudentdata:any;
    searchName:string="";
   
   constructor(private formbuilder:FormBuilder,private api:ApiService){}

   ngOnInit(): void {
    this.studentform=this.formbuilder.group({
      name:['',[Validators.required]],
      email:['',[Validators.required]],
      mobile:['',[Validators.required]],
      city:['',[Validators.required]],

    })
    this.getdata();
      }

  add(){
    this.showadd=true;
    this.showupdate=false;

  }
  edit(data:any){
    this.showadd=false;
    this.showupdate=true;
    this.studentmodelobj.id=data.id;

    this.studentform.controls['name'].setValue(data.name)
    this.studentform.controls['email'].setValue(data.email)
    this.studentform.controls['mobile'].setValue(data.mobile)
    this.studentform.controls['city'].setValue(data.city)

}
//update on edit
update(){
  this.studentmodelobj.name=this.studentform.value.name;
  this.studentmodelobj.email=this.studentform.value.email;
  this.studentmodelobj.mobile=this.studentform.value.mobile;
  this.studentmodelobj.city=this.studentform.value.city;

  this.api.updatestudent(this.studentmodelobj,this.studentmodelobj.id).subscribe(res=>{
    this.studentform.reset();
    this.getdata();
    alert("Record Updated Successfully");
  },
  err=>{
    alert("something went wrong")
  }
  )

}

addstudent(){
  this.studentmodelobj.name=this.studentform.value.name;
  this.studentmodelobj.email=this.studentform.value.email;
  this.studentmodelobj.mobile=this.studentform.value.mobile;
  this.studentmodelobj.city=this.studentform.value.city;

  this.api.poststudent(this.studentmodelobj).subscribe(res=>{
    console.log(res);
    this.getdata();
    this.studentform.reset();
    alert("Record added successfully");

  },
  err=>{
    alert("something went wrong!!!")
  })

  }

  getdata(){
    this.api.getstudent().subscribe(res=>{
      this.allstudentdata=res;

    })
  }

deletestud(data:any){
  if(confirm("Are you sure to delete?"))
  this.api.deletestudent(data.id).subscribe(res=>{
   alert("Record deleted Successfully")
   this.getdata();
})
}


}


