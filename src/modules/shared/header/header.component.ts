import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { JwtService } from 'src/services/jwt.service';
import { UserService } from 'src/services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  @Input() heading !: string;
  @Input() sub_heading !: string;
  isLoggedin!: boolean;

  constructor(
    public router: Router,
    public jwtService: JwtService,
    public userService: UserService,
  ) { }

  ngOnInit(): void {
    this.isLoggedin = this.userService.isLoggedIn();
  }

  //logout and refresh the page
  logout() {
    this.userService.logout();
    window.location.reload();
  }
}
