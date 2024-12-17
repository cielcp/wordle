import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WordleService {

  constructor(private http: HttpClient) { }

  getRandomWord(): Observable<any> {
    //return this.http.get("http://localhost:8080/hw8/wordle_api.php")
    return this.http.get("https://cs4640.cs.virginia.edu/ccp7gcp/hw8/wordle_api.php")
  }

  // NOTE: update the URL when publishing to the server!  This should
  // connect to a PHP file on our actual server.  For the published
  // backend above, we would change this URL to:
  // https://cs4640.cs.virginia.edu/activities/angular/backend.php
  /*
  sendRequest(data:any):Observable<any> {
    // Send the data array as a JSON object in the BODY of the HTTP POST request
    return this.http.post("http://localhost:8080/backend.php",JSON.stringify(data));
  } */

}