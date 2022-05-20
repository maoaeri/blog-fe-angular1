import { Component, OnInit } from '@angular/core';
import { JwtService } from 'src/services/jwt.service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {

  constructor(
    private jwtService: JwtService
  ) { }

  ngOnInit(): void {
  }

  a = this.jwtService.getTokenInfor()

}
