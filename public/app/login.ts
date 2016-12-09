/**
 * Created by balazs on 12/9/2016.
 */
/**
 * Created by balazs on 11/29/2016.
 */
import {Component, OnInit} from '@angular/core';
import {Router, Params, ActivatedRoute} from "@angular/router";

@Component({
  moduleId: module.id,
  selector: 'login',
  templateUrl: 'login.html'

})
export class LoginComponent implements OnInit{

  ngOnInit(): void {

  }

  constructor(private route: ActivatedRoute,
              private router: Router) { }


}
