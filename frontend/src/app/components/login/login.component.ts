import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms'
import { ProductService } from 'src/app/services/product.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private service:ProductService, private router:ActivatedRoute) { }

  errormsg:any;
  successmsg:any;
  getparamid:any;
  getparamid2:any;

  ngOnInit(): void {
    this.getparamid = this.router.snapshot.paramMap.get('Email,Password');
    //this.getparamid2 = this.router.snapshot.paramMap.get('Password');
    if(this.getparamid){
      this.service.getSingleData(this.userForm.value.Email, this.userForm.value.Password).subscribe((res) => {
        console.log('res==> ', res);
        this.userForm.patchValue({
          Email:res.data[0].Email,
          Password:res.data[0].Password
        });
      });
    }
  }

  userForm = new FormGroup({
    'Email': new FormControl('', Validators.required),
    'Password': new FormControl('', Validators.required)
  });

  //insert data
  userSubmit():any{
   // if(this.userForm.valid){
      console.log("form ->",this.userForm.value);
      this.service.getSingleData(this.userForm.value.Email,this.userForm.value.Password).subscribe((res) => {
        console.log(res, "res==>");
        this.userForm.reset();
        this.successmsg=res.message;
      });
 /*   }
    else{
      this.errormsg = 'All fields are required!';
    }*/
    
  }



}
