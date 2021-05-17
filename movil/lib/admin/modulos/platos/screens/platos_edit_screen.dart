import 'package:flutter/material.dart';
import 'package:get/get.dart';
import '../services/admin_platos_service.dart';
import '../../../../widgets/button_widget.dart';
import '../../../../widgets/input_widget.dart';
import '../../../../widgets/drawer_widget.dart';
import '../../../../utils/snackbar.dart';
import '../../../../utils/colors.dart';

class PlatosEditScreen extends StatefulWidget {

  @override
  _PlatosEditScreenState createState() => _PlatosEditScreenState();
}

class _PlatosEditScreenState extends State<PlatosEditScreen> {

  final data = Get.arguments[0];
  final infoPlato = Get.arguments[1];

  AdminPlatosService adminPlatosService = AdminPlatosService();
  CustomSnackbar customSnackbar = CustomSnackbar();

  @override
  Widget build(BuildContext context) {

    TextEditingController txtNombre = TextEditingController(text: infoPlato["nombre"]);
    TextEditingController txtPrecio = TextEditingController(text: infoPlato["precio"].toString());
    TextEditingController txtImagen = TextEditingController(text: infoPlato["imagen"]);

    return Scaffold(
      appBar: AppBar(
        title: Text("Modificar Plato"),
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
              label: 'Nombre',
            ),

            SizedBox(height: 10),

            InputWidget(
              controller: txtPrecio,
              label: 'Apellido',
            ),

            SizedBox(height: 10),

            InputWidget(
              controller: txtImagen, 
              label: 'Imagen',
            ),

            SizedBox(height: 10),

            ButtonWidget(
              icon: Icon(Icons.save),
              btnText: Text("MODIFICAR"), 
              onPressed: () {
                if (txtNombre.text.isEmpty || txtPrecio.text.isEmpty || txtImagen.text.isEmpty) {
                  CustomSnackbar.display("Error", "Todos los campos son obligatorios");
                } else if (!txtPrecio.text.isNum) {
                  CustomSnackbar.display("Error", "El precio no debe contener letras");
                } else {
                  adminPlatosService.editPlato(
                    infoPlato["id_plato"],
                    {
                      "nombre": txtNombre.text,
                      "precio": txtPrecio.text,
                      "imagen": txtImagen.text
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