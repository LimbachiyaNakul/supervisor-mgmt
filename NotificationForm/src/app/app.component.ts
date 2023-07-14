import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  FormGroupDirective,
  NgForm,
} from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { Supervisors } from './Supervisors';
import { RestApiService } from './RestApiService.service';
import { Supervisor } from './supervisor.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit{

  constructor(public restService:RestApiService){

  }

  ngOnInit(): void {
    this.restService.getSupervisors().subscribe((data:string[])=>{
      this.supervisors = data;
    });
    this.contactForm.get('emailFormControl')?.disable();
    this.contactForm.get('phonenumber')?.disable();
  }
  title = 'NotificationForm';
  matcher = new MyErrorStateMatcher();
  supervisors: string[] = [ ];

  contactForm = new FormGroup({
    firstname: new FormControl('', Validators.required),
    lastname: new FormControl('', Validators.required),
    emailstatus: new FormControl(),
    emailFormControl: new FormControl('', [
      Validators.required,
      Validators.email,
    ]),
    phonenumberstatus: new FormControl(),
    phonenumber: new FormControl(
      '',
      Validators.required
    ),
    supervisor: new FormControl('', Validators.required),
  });

  onSubmit() {
    console.log(this.contactForm.value);
    let supervisor:Supervisor = {
      firstName:this.contactForm.value.firstname,
      lastName: this.contactForm.value.lastname,
      email: this.contactForm.value.emailFormControl,
      phoneNumber: this.contactForm.value.phonenumber,
      supervisor:this.contactForm.value.supervisor
    }
    this.contactForm.reset();
    this.restService.submitSupervisors(supervisor).subscribe((res:any) => {
      console.log(res);
    })
    this.contactForm.get('emailFormControl')?.disable();
    this.contactForm.get('phonenumber')?.disable();
  }



  checkEmailStatus(event: any): void {
    console.log(event.checked);
    if(!event.checked){
      this.contactForm.get('emailFormControl')?.disable();
      this.contactForm.get('emailFormControl')?.clearValidators();

    }else{
      this.contactForm.get('emailFormControl')?.enable();
      this.contactForm.get('emailFormControl')?.addValidators(Validators.required);
    }
  }

  checkPhoneStatus(event: any):void {
    console.log(event.checked);
    if(!event.checked){
      this.contactForm.get('phonenumber')?.disable();
      this.contactForm.get('phonenumber')?.clearValidators();
    }else{
      this.contactForm.get('phonenumber')?.enable();
      this.contactForm.get('phonenumber')?.addValidators(Validators.required);
    }
  }
}

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(
    control: FormControl | null,
    form: FormGroupDirective | NgForm | null
  ): boolean {
    const isSubmitted = form && form.submitted;
    return !!(
      control &&
      control.invalid &&
      (control.dirty || control.touched || isSubmitted)
    );
  }
}
