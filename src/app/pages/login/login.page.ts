import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { IonSlides, NavController, LoadingController } from '@ionic/angular';
import { UsuarioService } from '../../services/usuario.service';
import { UIServiceService } from '../../services/uiservice.service';
import { Usuario } from '../../interfaces/interfaces';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  @ViewChild('slidePrincipal', { static: true }) slides: IonSlides;

  loginUser = {
    email: 'ekron77@gmail.com',
    pwd: '123456'
  };

  registerUser: Usuario = {
    nombre: 'User Test',
    email: 'test@test.com',
    pwd: '123456'
  };

  constructor(private usuarioService: UsuarioService,
              private navCtrl: NavController,
              private uiService: UIServiceService,
              private loadingCtrl: LoadingController) { }

  ngOnInit() {
    this.slides.lockSwipes(true);
  }

  async login(fLogin: NgForm) {
    if (fLogin.invalid) {
      return;
    }
    // Añadimos un loading mientras carga el login
    const loading = await this.loadingCtrl.create({
      message: 'Cargando...'
    });
    await loading.present();
    // Fin loading
    const valido = await this.usuarioService.login(this.loginUser.email, this.loginUser.pwd);
    loading.dismiss();
    if (valido) {
      // Navegar al Home
      this.navCtrl.navigateRoot('/home', { animated: true });
    } else {
      // Mostrar alerta de usuario incorrecto
      this.uiService.alertaInformativa('El usuario/contraseña no son correctos.');
    }
  }

  async registro(fRegistro: NgForm) {
    if (fRegistro.invalid) {
      return;
    }
    // Añadimos un loading mientras carga el registro
    const loading = await this.loadingCtrl.create({
      message: 'Cargando...'
    });
    await loading.present();
    // Fin loading
    const valido = await this.usuarioService.registro(this.registerUser);
    loading.dismiss();
    if (valido) {
      // Navegar al Home
      this.navCtrl.navigateRoot('/home', { animated: true });
    } else {
      // Mostrar alerta de usuario incorrecto
      this.uiService.alertaInformativa('El email utilizado ya existe.');
    }
  }

  mostrarRegistro() {
    this.slides.lockSwipes(false);
    this.slides.slideTo(0);
    this.slides.lockSwipes(true);
  }

  mostrarLogin() {
    this.slides.lockSwipes(false);
    this.slides.slideTo(1);
    this.slides.lockSwipes(true);
  }

}