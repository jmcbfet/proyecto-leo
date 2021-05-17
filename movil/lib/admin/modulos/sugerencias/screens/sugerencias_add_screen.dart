import 'package:flutter/material.dart';
import 'package:get/get.dart';
import '../services/admin_sugerencias_service.dart';
import '../../../../widgets/button_widget.dart';
import '../../../../widgets/input_widget.dart';
import '../../../../widgets/drawer_widget.dart';
import '../../../../utils/snackbar.dart';
import '../../../../utils/colors.dart';

class SugerenciasAddScreen extends StatefulWidget {

  @override
  _SugerenciasAddScreenState createState() => _SugerenciasAddScreenState();
}

class _SugerenciasAddScreenState extends State<SugerenciasAddScreen> {

  final data = Get.arguments;

  TextEditingController txtCorreo = TextEditingController();
  TextEditingController txtDescripcion = TextEditingController();

  AdminSugerenciasService adminSugerenciasService = AdminSugerenciasService();

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text("Agregar Sugerencia"),
        backgroundColor: Colores.colorFondo,
        actions: [
          IconButton(
            icon: Icon(Icons.arrow_back, color: Colors.white),
            onPressed: () => Get.toNamed('/admin/sugerencias', arguments: data)
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
              controller: txtCorreo, 
              label: 'Correo'
            ),

            SizedBox(height: 10),

            InputWidget(
              controller: txtDescripcion,
              label: 'Descripcion'
            ),

            SizedBox(height: 10),

            ButtonWidget(
              icon: Icon(Icons.save),
              btnText: Text("AGREGAR"), 
              onPressed: () {
                if (txtCorreo.text.isEmpty || txtDescripcion.text.isEmpty) {
                  CustomSnackbar.display("Error", "Todos los campos son obligatorios");
                } else if (!txtCorreo.text.isEmail) {
                  CustomSnackbar.display("Error", "El correo no es valido");
                } else {
                  adminSugerenciasService.addSugerencia({
                    "correo": txtCorreo.text,
                    "descripcion": txtDescripcion.text
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