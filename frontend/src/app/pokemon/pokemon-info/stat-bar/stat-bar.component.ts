import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-stat-bar',
  templateUrl: './stat-bar.component.html',
  styleUrls: ['./stat-bar.component.scss']
})
export class StatBarComponent implements OnInit {

  @Input() public value: number;
  @Input() color: string;
  @Input() max: number;

  public precentage: string;

  constructor() { }

  ngOnInit(): void {
    document.documentElement.style.setProperty('--color', this.color);
    this.precentage = String(Math.floor(this.value / this.max * 100)) + "%";
    // document.getElementById("stat").style.width = precentage;
  }

}
