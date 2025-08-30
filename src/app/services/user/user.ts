import { Injectable } from '@angular/core';
import {AuthControllerService, AuthResponseDto, LoginRequestDto} from '../../../gs-api/src';

import {Observable, Subscription} from 'rxjs';
import {Router} from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(
    private authenticationService: AuthControllerService,
    private route: Router
  ) {
  }

  login(authenticationRequest: LoginRequestDto): Observable<AuthResponseDto>{
      return this.authenticationService.login(authenticationRequest)

  }
  setConnectedUser(authenticationResponse: AuthResponseDto) : void{
    localStorage.setItem('connectedUser', JSON.stringify(authenticationResponse))
  }

  getConnectedUser(): AuthResponseDto {
    if (localStorage.getItem('connectedUser')) {
      return JSON.parse(localStorage.getItem('connectedUser') as string);
    }
    return {};
  }

  //TODO

  isUserLoggerAndAccessTokenValid(): boolean{
    if(localStorage.getItem('connectedUser')){
      //TODO
      return true
    }
    this.route.navigate(['login'])
    return false
  }
}
