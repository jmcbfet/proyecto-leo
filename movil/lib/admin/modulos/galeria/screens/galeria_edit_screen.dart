import 'package:flutter/material.dart';
import 'package:get/get.dart';
import '../services/admin_galeria_service.dart';
import '../../../../widgets/button_widget.dart';
import '../../../../widgets/input_widget.dart';
import '../../../../widgets/drawer_widget.dart';
import '../../../../utils/snackbar.dart';
import '../../../../utils/colors.dart';

class GaleriaEditScreen extends StatefulWidget {

  @override
  _GaleriaEditScreenState createState() => _GaleriaEditScreenState();
}

class _GaleriaEditScreenState extends State<GaleriaEditScreen> {

  final data = Get.arguments[0];
  final infoGaleria = Get.arguments[1];

  AdminGaleriaService adminGaleriaService = AdminGaleriaService();

  @override
  Widget build(BuildContext context) {

    TextEditingController txtSrc = TextEditingController(text: infoGaleria["src"]);
    TextEditingController txtAltText = TextEditingController(text: infoGaleria["altText"]);
    TextEditingController txtCaption = TextEditingController(text: infoGaleria["caption"]);

    return Scaffold(
      appBar: AppBar(
        title: Text("Modificar Plato"),
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
              label: 'Src',
            ),

            SizedBox(height: 10),

            InputWidget(
              controller: txtAltText,
              label: 'AltText',
            ),

            SizedBox(height: 10),

            InputWidget(
              controller: txtCaption, 
              label: 'Caption',
            ),

            SizedBox(height: 10),

            ButtonWidget(
              icon: Icon(Icons.save),
              btnText: Text("MODIFICAR"), 
              onPressed: () {
                if (txtSrc.text.isEmpty || txtAltText.text.isEmpty || txtCaption.text.isEmpty) {
                  CustomSnackbar.display("Error", "Todos los campos son obligatorios");
                } else {
                  adminGaleriaService.editGaleria(
                    infoGaleria["id_galeria"], 
                    {
                      "src": txtSrc.text,
                      "altText": txtAltText.text,
                      "caption": txtCaption.text
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