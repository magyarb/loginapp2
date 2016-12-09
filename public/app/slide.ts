/**
 * Created by balazs on 11/29/2016.
 */
import {Component, OnInit} from '@angular/core';
import {instapic} from "./instapic";
import { InstapicService } from './instapic.service';
import {Router, Params, ActivatedRoute} from "@angular/router";

@Component({
    moduleId: module.id,
    selector: 'slide',
    templateUrl: 'slide.html'

})
export class SlideComponent implements OnInit{
  title = 'asd';
  pics: instapic[] = [];
  currentpic ='';
  currno = 0;

  ngOnInit(): void {
    this.route.params.forEach((params: Params) => {
      let tag = params['tag'];
      this.getPics(tag);
    });
        setTimeout(() => {this.startShow()},1000);
    }
    constructor(private picservice: InstapicService,
                private route: ActivatedRoute,
                private router: Router) { }

  startShow(): void {
    this.currentpic = this.pics[0].url;
    console.log('loaded.');
    setInterval(() => {this.loopIt()},1000);
  }

  loopIt(): void {
    this.currno++;
    if(this.currno == this.pics.length)
      this.currno = 0;
    this.currentpic = this.pics[this.currno].url;
}

    getPics(tag): void {
        this.picservice.getPics(tag).then(pics => this.pics = pics);
    }
}
