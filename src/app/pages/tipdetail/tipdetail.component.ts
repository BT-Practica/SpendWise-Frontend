import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Tip, TipsService } from '../../core/tips.service';
import { CommonModule } from '@angular/common';
import { AuthnavbarComponent } from '../../common/navbar/authnavbar/authnavbar.component';

@Component({
  selector: 'app-tipdetail',
  standalone: true,
  imports: [CommonModule, AuthnavbarComponent],
  templateUrl: './tipdetail.component.html',
  styleUrl: './tipdetail.component.scss'
})
export class TipdetailComponent implements OnInit {
  tip: Tip | undefined;

  constructor(private route: ActivatedRoute, private tipsService: TipsService) {}
  
  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      const tipId = +id;
      this.tip = this.tipsService.getTip(tipId);
    }
  }
  
  
}