import 'package:flutter/material.dart';
import 'package:get/get.dart';
import '../services/admin_sugerencias_service.dart';
import '../../../../widgets/button_widget.dart';
import '../../../../widgets/input_widget.dart';
import '../../../../widgets/drawer_widget.dart';
import '../../../../utils/snackbar.dart';
import '../../../../utils/colors.dart';

class SugerenciasEditScreen extends StatefulWidget {

  @override
  _SugerenciasEditScreenState createState() => _SugerenciasEditScreenState();
}

class _SugerenciasEditScreenState extends State<SugerenciasEditScreen> {

  final data = Get.arguments[0];
  final infoSugerencia = Get.arguments[1];

  AdminSugerenciasService adminSugerenciasService = AdminSugerenciasService();

  String valueDropdown;
  
  List<String> listItem = [
    "Admin",
    "Usuario"
  ];

  @override
  Widget build(BuildContext context) {

    TextEditingController txtCorreo = TextEditingController(text: infoSugerencia["correo"]);
    TextEditingController txtDescripcion = TextEditingController(text: infoSugerencia["descripcion"]);

    return Scaffold(
      appBar: AppBar(
        title: Text("Modificar Sugerencia"),
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
              label: 'Correo',
            ),

            SizedBox(height: 10),

            InputWidget(
              controller: txtDescripcion,
              label: 'Descripcion',
            ),

            SizedBox(height: 10),

            ButtonWidget(
              icon: Icon(Icons.save),
              btnText: Text("MODIFICAR"), 
              onPressed: () {
                if (txtCorreo.text.isEmpty || txtDescripcion.text.isEmpty) {
                  CustomSnackbar.display("Error", "Todos los campos son obligatorios");
                } else if (!txtCorreo.text.isEmail) {
                  CustomSnackbar.display("Error", "El correo no es valido");
                } else {
                  adminSugerenciasService.editSugerencia(
                    infoSugerencia["id_sugerencia"],
                    {
                      "correo": txtCorreo.text,
                      "descripcion": txtDescripcion.text
                    }
                  );
                }
              }
            )

          ],
        ),
      ),
    );
  }
}