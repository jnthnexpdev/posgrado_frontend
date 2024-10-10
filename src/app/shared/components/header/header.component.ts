import { NgClass } from '@angular/common';
import { Component, OnInit, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [NgClass, RouterLink, RouterLinkActive],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit{

  public isAuth = signal(true);
  public menuOpen = signal(false);

  ngOnInit(): void {
    
  }

  changeStatusMenu(): void{
    this.menuOpen.set(!this.menuOpen())
  }

}
