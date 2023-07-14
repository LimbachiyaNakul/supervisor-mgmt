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

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit{

  constructor(public restService:RestApiService){

  }

  ngOnInit(): void {
    this.restService.getSupervisors().subscribe((data:Supervisors[])=>{
      this.supervisors = data;
    });
  }
  title = 'NotificationForm';
  matcher = new MyErrorStateMatcher();
  supervisors: Supervisors[] = [ ];
  // TODO:
  // disabledPhone: boolean = true;
  // disabledEmail: boolean = true;

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
    this.contactForm.reset();
    // this.contactForm.get('firstname')?.reset();
  }



  checkEmailStatus(event: any): void {
    console.log(event.checked);
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
