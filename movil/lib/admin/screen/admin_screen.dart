import 'package:flutter/material.dart';
import 'package:get/get.dart';
import '../../widgets/drawer_widget.dart';
import '../../utils/colors.dart';
import '../../utils/text_styles.dart';

class AdminScreen extends StatelessWidget {

  final data = Get.arguments;

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text("Admin"),
        backgroundColor: Colores.colorFondo,
      ),
      drawer: DrawerWidget(
        data: data
      ),
      backgroundColor: Colores.colorFondo,
      body: Center(
        child: Text("Bienvenido ${data["nombre"]}", style: EstilosText.textBienvenida),
      ),
      
    );
  }
}