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
        next: () => {
          this.messageSuccess = "Redirecting..."
          setTimeout(() => {
            const returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/resetpassword';
            this.router.navigateByUrl(returnUrl);
          }, 5000)
        },
        error: (err: HttpErrorResponse) => {
          // this.alertService.error(error);
          this.messageError = err.error.message;
        } 
      })
  }

}
