import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms'
import { ProductService } from 'src/app/services/product.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-user-account',
  templateUrl: './user-account.component.html',
  styleUrls: ['./user-account.component.scss']
})
export class UserAccountComponent implements OnInit {

  constructor(private service:ProductService, private router:ActivatedRoute) { }

  errormsg:any;
  successmsg:any;
  getparamid:any;

  ngOnInit(): void {
  }

  userForm = new FormGroup({
    'FirstName': new FormControl('', Validators.required),
    'LastName': new FormControl('', Validators.required),
    'Contact': new FormControl('', Validators.required),
    'Email': new FormControl('', Validators.required),
    'Password': new FormControl('', Validators.required)
  });

  //insert data
  userSubmit(){
    if(this.userForm.valid){
      console.log(this.userForm.value);
      this.service.insertData(this.userForm.value).subscribe((res) => {
        console.log(res, "res==>");
        this.userForm.reset();
        this.successmsg=res.message;
      });
    }
    else{
      this.errormsg = 'All fields are required!';
    }
    
  }
}
