/**
 * Created by balazs on 10/18/2016.
 */
import {Component, OnInit} from '@angular/core';
import {Hero} from "./hero";
import { HeroService } from './hero.service';

@Component({
  selector: 'my-heroes',
  template:`
  <h2>My Heroes</h2>
  <ul class="heroes">
    <li *ngFor="let hero of heroes"
      [class.selected]="hero === selectedHero"
      (click)="onSelect(hero)">
      <span class="badge">{{hero.id}}</span> {{hero.name}}
    </li>
  </ul>
  <my-hero-detail [hero]="selectedHero"></my-hero-detail>`,

})
export class HeroesComponent implements OnInit{
  ngOnInit(): void {
    this.getHeroes();
  }
  constructor(private heroService: HeroService) { }
  title = 'Tour of Heroes';
  selectedHero: Hero;
  heroes: Hero[];
  getHeroes(): void {
    this.heroService.getHeroes().then(heroes => this.heroes = heroes);
  }
  onSelect(hero: Hero): void {
    this.selectedHero = hero;
  }

}

