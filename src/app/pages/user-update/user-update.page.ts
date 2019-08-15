import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../interfaces/interfaces';
import { UsuarioService } from '../../services/usuario.service';
import { NgForm } from '@angular/forms';
import { UIServiceService } from '../../services/uiservice.service';

@Component({
  selector: 'app-user-update',
  templateUrl: './user-update.page.html',
  styleUrls: ['./user-update.page.scss'],
})
export class UserUpdatePage implements OnInit {

  usuario: Usuario = {};

  constructor(private usuarioService: UsuarioService, private uiService: UIServiceService) { }

  ngOnInit() {
    this.usuario = this.usuarioService.getUsuario();
    console.log(this.usuario);
  }

  async actualizarUsuario(fActualizar: NgForm) {
    if (fActualizar.invalid) { return; }
    const actualizado = await this.usuarioService.actualizarUsuario(this.usuario);
    if (actualizado) {
      // Toast con el mensaje de actualizado
      this.uiService.toastInformativo('Usuario actualizado correctamente!');
    } else {
      // Toast con el mensaje de error
      this.uiService.toastInformativo('No se pudo actualizar el usuario');
    }
  }

  logout() {
    this.usuarioService.logout();
  }

}
