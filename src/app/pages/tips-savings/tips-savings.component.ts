import { Component, OnInit } from '@angular/core';
import { TipsService, Tip } from '../../core/tips.service';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthnavbarComponent } from '../../common/navbar/authnavbar/authnavbar.component';

@Component({
  selector: 'app-tips-savings',
  standalone: true,
  imports: [CommonModule, RouterLink, AuthnavbarComponent],
  templateUrl: './tips-savings.component.html',
  styleUrls: ['./tips-savings.component.scss']
})
export class TipsSavingsComponent implements OnInit {
  tips: Tip[] = [];

  constructor(private tipsService: TipsService) {}

  ngOnInit() {
    this.tips = this.tipsService.getTips();
  }
}
