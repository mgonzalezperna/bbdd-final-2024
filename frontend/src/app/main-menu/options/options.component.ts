import { Input, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-options',
  templateUrl: './options.component.html',
  styleUrls: ['./options.component.css']
})
export class OptionsComponent implements OnInit {
  @Input() menu_button_desc: String = ''
  @Input() menu_button: String = ''
  @Input() route: String = ''

  constructor() { }

  ngOnInit() {
  }

}
