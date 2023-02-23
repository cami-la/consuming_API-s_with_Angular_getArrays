import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  constructor(private userService: UserService) {}
  
  ngOnInit(): void {
    this.userService.getUsers(15).subscribe(
      (results: any) => {
        console.log(results)
      }
    );
  }

}
