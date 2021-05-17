import 'package:flutter/material.dart';
import 'package:get/get.dart';
import '../../../../widgets/drawer_widget.dart';
import '../services/admin_user_service.dart';
import '../../../../models/user_model.dart';
import '../../../../utils/colors.dart';

class UsuariosAdminScreen extends StatefulWidget {
  
  @override
  _UsuariosAdminScreenState createState() => _UsuariosAdminScreenState();
}

class _UsuariosAdminScreenState extends State<UsuariosAdminScreen> {

  final data = Get.arguments;

  AdminUserService adminUserService = AdminUserService();

  Future<List<User>> _users;

  @override
  void initState() {
    super.initState();
    _users = adminUserService.getAllUsers();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text("Admin"),
        backgroundColor: Colores.colorBoton,
      ),
      drawer: DrawerWidget(
        data: data,
      ),
      backgroundColor: Colores.colorFondo,
      body: FutureBuilder(
        future: _users,
        builder: (BuildContext context, AsyncSnapshot snapshot) {
          if (snapshot.hasData) {
            return ListView(
              children: _listUsers(snapshot.data),
            );
          } else if (snapshot.hasError) {
              print(snapshot.error);
          }

          return Center(child: CircularProgressIndicator());
        },
      ),
      floatingActionButton: FloatingActionButton(
        child: Icon(Icons.add),
        backgroundColor: Colores.colorBoton,
        onPressed: () => Get.toNamed('/admin/usuarios/add', arguments: data)
      ),
    );
  }

  List<Widget> _listUsers(List<User> usuarios) {

    List<Widget> items = [];

    for (var user in usuarios) {
      items.add(
        ListTile(
          title: Text(user.nombre + " " + user.apellido, style: TextStyle(color: Colors.white)),
          subtitle: Text(user.descripcion, style: TextStyle(color: Colors.white)),
          onTap: () {

            Map<String, dynamic> infoUser = {};

            infoUser["nombre"] = user.nombre;
            infoUser["apellido"] = user.apellido;
            infoUser["descripcion"] = user.descripcion;
            infoUser["correo"] = user.correo;
            infoUser["password"] = user.password;
            infoUser["id_usuario"] = user.idUsuario;
            infoUser["id_rol"] = user.idRol;

            Get.toNamed('/admin/usuarios/edit', arguments: [data, infoUser]);

          },
            
          trailing: IconButton(

            icon: Icon(Icons.delete, color: Colors.white,),
            onPressed: () {
              adminUserService.deleteUser(user.idUsuario);
              setState(() {
                _users = adminUserService.getAllUsers();
              });
            },

          ),
        )
            
      );
    }

    return items;

  }

}