import { Component, OnInit } from '@angular/core';
import {AdherentRequest} from "../../../models/interface";
import {ActivatedRoute, Router} from "@angular/router";
import {UserService} from "../../services/user.service";
import {HttpClient} from "@angular/common/http";
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'app-modification-avatar-profil',
  template: `<img src="http://localhost:8000/storage/public/{{infosUser.avatar}}"><div></div>
  <form action="{{'http://localhost:8000/api/adherent/'+infosUser.id+'/avatar'}}" method="post" enctype="multipart/form-data">
    <div class="form-group">
      <input type="file" name="document" id="doc" value="PUT">
    </div>
  </form>`,
  styles: [':host { display: flex; justify-content: center; margin: 100px 0;}',
    'img {  max-width: 300px; max-height: 300px;}']
})
export class ModificationAvatarProfilComponent implements OnInit {
  id: number = +(this.route.snapshot.paramMap.get('id') || 0);
  infosUser: AdherentRequest;

  constructor(private route: ActivatedRoute, private http: HttpClient, private authService: AuthService, private userService: UserService, private router: Router) {
    this.infosUser = <AdherentRequest>{};
    this.userService.getProfil(this.id).subscribe(value => (this.infosUser = value));
  }

  ngOnInit(): void {
  }

}
