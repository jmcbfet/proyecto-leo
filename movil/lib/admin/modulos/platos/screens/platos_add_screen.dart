import 'package:flutter/material.dart';
import 'package:get/get.dart';
import '../services/admin_platos_service.dart';
import '../../../../widgets/button_widget.dart';
import '../../../../widgets/input_widget.dart';
import '../../../../widgets/drawer_widget.dart';
import '../../../../utils/snackbar.dart';
import '../../../../utils/colors.dart';

class PlatosAddScreen extends StatefulWidget {

  @override
  _PlatosAddScreenState createState() => _PlatosAddScreenState();
}

class _PlatosAddScreenState extends State<PlatosAddScreen> {

  final data = Get.arguments;

  TextEditingController txtNombre = TextEditingController();
  TextEditingController txtPrecio = TextEditingController();
  TextEditingController txtImagen = TextEditingController();

  AdminPlatosService adminPlatosService = AdminPlatosService();
  CustomSnackbar customSnackbar = CustomSnackbar();

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text("Agregar Plato"),
        backgroundColor: Colores.colorFondo,
        actions: [
          IconButton(
            icon: Icon(Icons.arrow_back, color: Colors.white),
            onPressed: () => Get.toNamed('/admin/platos', arguments: data)
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
              controller: txtPrecio,
              label: 'Precio'
            ),

            SizedBox(height: 10),

            InputWidget(
              controller: txtImagen, 
              label: 'Imagen'
            ),

            SizedBox(height: 10),

            ButtonWidget(
              icon: Icon(Icons.save),
              btnText: Text("AGREGAR"), 
              onPressed: () {
                if (txtNombre.text.isEmpty || txtPrecio.text.isEmpty || txtImagen.text.isEmpty) {
                  CustomSnackbar.display("Error", "Todos los campos son obligatorios");
                } else if (!txtPrecio.text.isNum) {
                  CustomSnackbar.display("Error", "El precio no debe contener letras");
                } else {
                  adminPlatosService.addPlato({
                    "nombre": txtNombre.text,
                    "precio": txtPrecio.text,
                    "imagen": txtImagen.text
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