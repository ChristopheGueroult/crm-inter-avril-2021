import { Component, OnInit } from '@angular/core';
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-icon-info',
  templateUrl: './icon-info.component.html',
  styleUrls: ['./icon-info.component.scss'],
})
export class IconInfoComponent implements OnInit {
  public myicon = faInfoCircle;
  constructor() {}

  ngOnInit(): void {}
}
