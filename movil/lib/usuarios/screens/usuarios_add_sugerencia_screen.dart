import 'package:flutter/material.dart';
import 'package:get/get.dart';
import '../services/usuarios_service.dart';
import '../../widgets/input_widget.dart';
import '../../widgets/button_widget.dart';
import '../../utils/colors.dart';
import '../../utils/snackbar.dart';

class UsuariosScreenSugerencias extends StatefulWidget {

  @override
  _UsuariosScreenSugerenciasState createState() => _UsuariosScreenSugerenciasState();
}

class _UsuariosScreenSugerenciasState extends State<UsuariosScreenSugerencias> {

  final data = Get.arguments;

  TextEditingController txtCorreo = TextEditingController();
  TextEditingController txtDescripcion = TextEditingController();

  UsuariosService usuariosService = UsuariosService();

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text("Bienvenido " + data["nombre"]),
        backgroundColor: Colores.colorFondo,
      ),
      backgroundColor: Colores.colorFondo,
      body: SingleChildScrollView(
        child: Column(
          children: [

            SizedBox(height: 10),

            InputWidget(
              controller: txtCorreo, 
              label: "Correo"
            ),

            SizedBox(height: 10),

            InputWidget(
              controller: txtDescripcion, 
              label: "Descripcion"
            ),

            SizedBox(height: 10),

            ButtonWidget(
              icon: Icon(Icons.send),
              btnText: Text("Enviar Sugerencia"),
              onPressed: () {
                if (txtCorreo.text.isEmpty || txtDescripcion.text.isEmpty) {
                  CustomSnackbar.display("Error", "Todos los campos son obligatorios");
                } else {
                  usuariosService.addSugerencia({
                    "correo": txtCorreo.text,
                    "descripcion": txtDescripcion.text
                  });
                }
              }
            )

          ],
        ),
      )
    );
  }
}