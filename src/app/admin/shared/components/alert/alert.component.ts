import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {AlertService} from "../../services/alert.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss']
})
export class AlertComponent implements OnInit, OnDestroy {

  @Input() delay = 5000;
  public type = 'success';
  public  text: string;

  alertSub: Subscription;

  constructor(private alert: AlertService) {

  }

  ngOnInit() {
    this.alertSub = this.alert.alert$.subscribe(al=>{
      this.text = al.text;
      this.type = al.type;

      const timeout = setTimeout(()=>{
        clearTimeout(timeout);
        this.text = '';
      },this.delay)
    });
  }

  ngOnDestroy(): void {
    if (this.alertSub){
      this.alertSub.unsubscribe();
    }
  }

}
