import 'package:flutter/material.dart';
import 'package:get/get.dart';
import '../services/admin_user_service.dart';
import '../../../../widgets/button_widget.dart';
import '../../../../widgets/dropdown_button_widget.dart';
import '../../../../widgets/input_widget.dart';
import '../../../../widgets/drawer_widget.dart';
import '../../../../utils/snackbar.dart';
import '../../../../utils/colors.dart';

class UsuariosAddScreen extends StatefulWidget {

  @override
  _UsuariosAddScreenState createState() => _UsuariosAddScreenState();
}

class _UsuariosAddScreenState extends State<UsuariosAddScreen> {

  final data = Get.arguments;

  TextEditingController txtNombre = TextEditingController();
  TextEditingController txtApellido = TextEditingController();
  TextEditingController txtEmail = TextEditingController();
  TextEditingController txtPassword = TextEditingController();

  AdminUserService adminUserService = AdminUserService();
  CustomSnackbar customSnackbar = CustomSnackbar();

  String valueDropdown;
  
  List<String> listItem = [
    "Admin",
    "Usuario"
  ];

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text("Agregar Usuario"),
        backgroundColor: Colores.colorFondo,
        actions: [
          IconButton(
            icon: Icon(Icons.arrow_back, color: Colors.white),
            onPressed: () => Get.toNamed('/admin/usuarios', arguments: data)
          )
        ],
      ),
      drawer: DrawerWidget(
        data: data,
      ),
      backgroundColor: Colores.colorFondo,
      body: SingleChildScrollView(
        child: Column(
          children: [

            SizedBox(height: 10),

            InputWidget(
              controller: txtNombre, 
              label: 'Nombre'
            ),

            SizedBox(height: 10),

            InputWidget(
              controller: txtApellido,
              label: 'Apellido'
            ),

            SizedBox(height: 10),

            InputWidget(
              controller: txtEmail, 
              label: 'Correo'
            ),

            SizedBox(height: 10),

            InputWidget(
              controller: txtPassword, 
              label: 'Contraseña',
              obscureText: true,
            ),

            SizedBox(height: 10),

            DropdownButtonFormFieldWidget(
              label: "Rol", 
              value: valueDropdown,
              items: listItem,
              onChanged: (value) {
                setState(() {
                  valueDropdown = value; 
                });
              },
            ),

            SizedBox(height: 10),

            ButtonWidget(
              icon: Icon(Icons.save),
              btnText: Text("AGREGAR"), 
              onPressed: () {
                if (txtNombre.text.isEmpty || txtApellido.text.isEmpty || txtEmail.text.isEmpty || txtPassword.text.isEmpty) {
                  CustomSnackbar.display("Error", "Todos los campos son obligatorios");
                } else if (!txtEmail.text.isEmail) {
                  CustomSnackbar.display("Error", "El correo no es valido");
                } else if (txtPassword.text.length < 6) {
                  CustomSnackbar.display("Error", "La contraseña debe tener minimo 6 caracteres");
                } else {
                  adminUserService.addUser({
                    "nombre" : txtNombre.text,
                    "apellido" : txtApellido.text,
                    "correo" : txtEmail.text,
                    "password" : txtPassword.text,
                    "id_rol": valueDropdown == "Admin" ? 1 : 2
                  });
                }
              }
            )

          ],
        ),
      ),
    );
  }
}