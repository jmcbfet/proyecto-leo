import 'package:flutter/material.dart';
import 'package:get/get.dart';
import '../services/admin_galeria_service.dart';
import '../../../../widgets/button_widget.dart';
import '../../../../widgets/input_widget.dart';
import '../../../../widgets/drawer_widget.dart';
import '../../../../utils/snackbar.dart';
import '../../../../utils/colors.dart';

class GaleriaAddScreen extends StatefulWidget {

  @override
  _GaleriaAddScreenState createState() => _GaleriaAddScreenState();
}

class _GaleriaAddScreenState extends State<GaleriaAddScreen> {

  final data = Get.arguments;

  TextEditingController txtSrc = TextEditingController();
  TextEditingController txtAltText = TextEditingController();
  TextEditingController txtCaption = TextEditingController();

  AdminGaleriaService adminGaleriaService = AdminGaleriaService();

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text("Agregar Plato"),
        backgroundColor: Colores.colorFondo,
        actions: [
          IconButton(
            icon: Icon(Icons.arrow_back, color: Colors.white),
            onPressed: () => Get.toNamed('/admin/galeria', arguments: data)
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
              controller: txtSrc, 
              label: 'Src'
            ),

            SizedBox(height: 10),

            InputWidget(
              controller: txtAltText,
              label: 'AltText'
            ),

            SizedBox(height: 10),

            InputWidget(
              controller: txtCaption, 
              label: 'Caption'
            ),

            SizedBox(height: 10),

            ButtonWidget(
              icon: Icon(Icons.save),
              btnText: Text("AGREGAR"), 
              onPressed: () {
                if (txtSrc.text.isEmpty || txtAltText.text.isEmpty || txtCaption.text.isEmpty) {
                  CustomSnackbar.display("Error", "Todos los campos son obligatorios");
                } else {
                  adminGaleriaService.addGaleria({
                    "src": txtSrc.text,
                    "altText": txtAltText.text,
                    "caption": txtCaption.text
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