import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/services/user.service';

@Component({
  selector: 'app-check-token',
  templateUrl: './check-token.component.html',
  styleUrls: ['./check-token.component.css']
})
export class CheckTokenComponent implements OnInit {
  token !: string;
  messageSuccess !: string;
  messageError !: string;
  check = false;
  email !: string;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.route.queryParams
      .subscribe(params => {
        this.token = params.token;
      }
    );
    this.userService.checkToken(this.token)
      .subscribe({
        next: (info: any) => {
          this.messageSuccess = "Redirecting..."
          setTimeout(() => {
            this.check = true;
          }, 5000);
          console.log(info.email);
          this.email = info.email;
        },
        error: (err: HttpErrorResponse) => {
          // this.alertService.error(error);
          this.messageError = err.error.message;
        } 
      })
  }

}
