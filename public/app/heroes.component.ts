/**
 * Created by balazs on 10/18/2016.
 */
import {Component, OnInit} from '@angular/core';
import {Hero} from "./hero";
import { HeroService } from './hero.service';
import {Router} from "@angular/router";
import {
  Input,
  trigger,
  state,
  style,
  transition,
  animate
} from '@angular/core';


@Component({
  moduleId: module.id,
  selector: 'my-heroes',
  templateUrl: 'heroes.component.html',
    animations: [
        trigger('heroState', [
            state('inactive', style({
                backgroundColor: '#eee',
                transform: 'scale(1)'
            })),
            state('active',   style({
                backgroundColor: '#cfd8dc',
                transform: 'scale(1.1)'
            })),
            transition('inactive => active', animate('100ms ease-in')),
            transition('active => inactive', animate('100ms ease-out'))
        ])
    ]

})
export class HeroesComponent implements OnInit{
  ngOnInit(): void {
    this.getHeroes();
  }
  constructor(private heroService: HeroService,
  private router: Router) { }

  title = 'Tour of Heroes';
  selectedHero: Hero;
  heroes: Hero[];

  getHeroes(): void {
    this.heroService.getHeroes().then(heroes => this.heroes = heroes);
  }
  onSelect(hero: Hero): void {
    this.selectedHero = hero;
  }

  gotoDetail(): void {
    this.router.navigate(['/detail', this.selectedHero.id]);
  }
}

