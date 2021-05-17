import 'package:flutter/material.dart';

import 'package:movil/auth/screens/login_screen.dart';
import 'package:movil/auth/screens/register_screen.dart';

import 'package:movil/usuarios/screens/usuarios_screen.dart';

import 'package:movil/usuarios/screens/usuarios_add_sugerencia_screen.dart';
import 'package:movil/usuarios/screens/usuarios_carta_screen.dart';

import 'package:movil/admin/screen/admin_screen.dart';

import 'package:movil/admin/modulos/usuario/screens/usuarios_admin_screen.dart';
import 'package:movil/admin/modulos/usuario/screens/usuarios_add_screen.dart';
import 'package:movil/admin/modulos/usuario/screens/usuarios_edit_screen.dart';

import 'package:movil/admin/modulos/comentarios/screens/comentarios_admin_screen.dart';
import 'package:movil/admin/modulos/comentarios/screens/comentarios_add_screen.dart';
import 'package:movil/admin/modulos/comentarios/screens/comentarios_edit_screen.dart';

import 'package:movil/admin/modulos/platos/screens/platos_admin_screen.dart';
import 'package:movil/admin/modulos/platos/screens/platos_add_screen.dart';
import 'package:movil/admin/modulos/platos/screens/platos_edit_screen.dart';

import 'package:movil/admin/modulos/sugerencias/screens/sugerencias_admin_screen.dart';
import 'package:movil/admin/modulos/sugerencias/screens/sugerencias_add_screen.dart';
import 'package:movil/admin/modulos/sugerencias/screens/sugerencias_edit_screen.dart';

import 'package:movil/admin/modulos/galeria/screens/galeria_admin_screen.dart';
import 'package:movil/admin/modulos/galeria/screens/galeria_add_screen.dart';
import 'package:movil/admin/modulos/galeria/screens/galeria_edit_screen.dart';


Map<String, WidgetBuilder> getAllRoutes() {

  return <String, WidgetBuilder> {

    '/'                       : (BuildContext context) => LoginScreen(),
    '/registro'               : (BuildContext context) => RegistroScreen(),

    '/user'                   : (BuildContext context) => UsuariosScreen(),

    '/user/sugerencias'       : (BuildContext context) => UsuariosScreenSugerencias(),
    '/user/carta'             : (BuildContext context) => UsuariosCartaScreen(),

    '/admin'                  : (BuildContext context) => AdminScreen(),

    '/admin/usuarios'         : (BuildContext context) => UsuariosAdminScreen(),
    '/admin/usuarios/add'     : (BuildContext context) => UsuariosAddScreen(),
    '/admin/usuarios/edit'    : (BuildContext context) => UsuariosEditScreen(),

    '/admin/comentarios'      : (BuildContext context) => ComentariosAdminScreen(),
    '/admin/comentarios/add'  : (BuildContext context) => ComentariosAddScreen(),
    '/admin/comentarios/edit' : (BuildContext context) => ComentariosEditScreen(),

    '/admin/platos'           : (BuildContext context) => PlatosAdminScreen(),
    '/admin/platos/add'       : (BuildContext context) => PlatosAddScreen(),
    '/admin/platos/edit'      : (BuildContext context) => PlatosEditScreen(),

    '/admin/sugerencias'      : (BuildContext context) => SugerenciasAdminScreen(),
    '/admin/sugerencias/add'  : (BuildContext context) => SugerenciasAddScreen(),
    '/admin/sugerencias/edit' : (BuildContext context) => SugerenciasEditScreen(),

    '/admin/galeria'          : (BuildContext context) => GaleriaAdminScreen(),
    '/admin/galeria/add'      : (BuildContext context) => GaleriaAddScreen(),
    '/admin/galeria/edit'     : (BuildContext context) => GaleriaEditScreen()

  };

}