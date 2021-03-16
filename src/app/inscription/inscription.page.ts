import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastController } from '@ionic/angular';
import { UserModule } from 'src/app/models/user/user.module';
import { UserService } from 'src/app/services/user.service'

@Component({
  selector: 'app-inscription',
  templateUrl: './inscription.page.html',
  styleUrls: ['./inscription.page.scss'],
})
export class InscriptionPage implements OnInit {

  @ViewChild('signupSlider') signupSlider;

  inscriptionUserForm: FormGroup;
  user: UserModule;

  public slideOneForm: FormGroup;
  public slideTwoForm: FormGroup;
  public slideThreeForm: FormGroup;

  public submitAttempt: boolean = false;


  selectedFile: File;


  constructor(public formBuilder: FormBuilder, public toastController: ToastController, private _us: UserService,
    private fb: FormBuilder) {
    this.slideOneForm = formBuilder.group({
      nom: ['', Validators.compose([Validators.maxLength(30), Validators.pattern("[a-zA-Z][a-zA-Z]+"), Validators.required])],
      prenom: ['', Validators.compose([Validators.maxLength(30), Validators.pattern("[a-zA-Z][a-zA-Z]+"), Validators.required])],
      dateNaiss: ['', Validators.required],
      adresse: ['', Validators.compose([Validators.maxLength(60), Validators.pattern("[a-zA-Z][a-zA-Z][0-9]+"), Validators.required])],
    });

    this.slideTwoForm = formBuilder.group({
      tel: ['', Validators.compose([Validators.maxLength(8), Validators.minLength(8), Validators.required, Validators.pattern("[0-9]+")])],
      cin: ['', Validators.compose([Validators.maxLength(8), Validators.minLength(8), Validators.required, Validators.pattern("[0-9]+")])],
      img: ['', Validators.required]
    });

    this.slideThreeForm = formBuilder.group({
      email: ['', Validators.compose([Validators.required, Validators.email])],
      mdp: ['', Validators.compose([Validators.required, Validators.minLength(8)])],
      Rmdp: ['', Validators.compose([Validators.required, Validators.minLength(8)])]
    });
  }

  ngOnInit() {
  }

  next() {
    this.signupSlider.slideNext();
  }

  prev() {
    this.signupSlider.slidePrev();
  }

  get nom() {
    return this.slideOneForm.get('nom');
  }

  get prenom() {
    return this.slideOneForm.get('prenom');
  }

  get dateNaiss() {
    return this.slideOneForm.get('dateNaiss');
  }

  get adresse() {
    return this.slideOneForm.get('adresse');
  }

  get tel() {
    return this.slideTwoForm.get('nom');
  }

  get cin() {
    return this.slideTwoForm.get('cin');
  }

  get email() {
    return this.slideThreeForm.get('email');
  }

  get motDePasse() {
    return this.slideThreeForm.get('motDePasse');
  }

  get ReMotDePasse() {
    return this.slideThreeForm.get('ReMotDePasse');
  }

  get img() {
    return this.slideTwoForm.get('img');
  }

  onFileSelected(event) {
    console.log(event);
    this.selectedFile = event.target.files[0];
  }



  inscription() {

    const fd = new FormData();
    let data = this.inscriptionUserForm.value;

    const usr = new UserModule(data.nom, data.prenom, data.dateNaiss, data.adresse, data.email, data.motDePasse,
      data.cin, data.tel, null);
    fd.append('img', this.selectedFile, this.selectedFile.name);
    fd.append('user', JSON.stringify(usr));
    console.log("UserModule" + fd.get("user"));

   /*  this._us.addUser(fd, data.ReMotDePasse).subscribe(
      (val) => {
        console.log("user2: " + fd.get("user"));
        console.log("POST call successful value returned in body", val);
      },
      response => {
        console.log("user3: " + fd.get("user"));
        console.log("POST call in error", response);
      },
      () => {
        console.log("user4: " + fd.get("user"));
        console.log("The POST observable is now completed.");

      }
    ) */
  }


}
