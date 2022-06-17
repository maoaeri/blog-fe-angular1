import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { JwtService } from 'src/services/jwt.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  @Input() heading !: string;
  @Input() sub_heading !: string;

  constructor(
    public router: Router,
    public jwtService: JwtService
  ) { }

  ngOnInit(): void {
  }

}
