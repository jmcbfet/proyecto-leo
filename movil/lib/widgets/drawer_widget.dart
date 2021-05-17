import 'package:flutter/material.dart';
import 'package:get/get.dart';
import '../utils/colors.dart';
import '../utils/text_styles.dart';

class DrawerWidget extends StatelessWidget {

  final Map<String, dynamic> data;

  DrawerWidget({ @required this.data });

  @override
  Widget build(BuildContext context) {
    return Drawer(
      child: Container(
        decoration: BoxDecoration(
          color: Colores.colorDrawerFondo
        ),
        child: Column(
          children: [

            Container(
              width: double.infinity,
              padding: EdgeInsets.all(20),
              color: Colores.colorFondo,
              child: Center(
                child: Column(
                  children: [

                    Container(
                      width: 100,
                      height: 100,
                      margin: EdgeInsets.only(top: 30),
                      decoration: BoxDecoration(
                        shape: BoxShape.circle,
                        color: Colores.colorDrawerAvatar,
                        border: Border.all(color: Colors.white)
                      ),
                      child: Center(
                        child: Text(data["nombre"][0], style: EstilosText.avatarTextStyle),
                      ),
                    ),

                    SizedBox(height: 5),

                    Text(data["correo"], style: EstilosText.emailTextStyle),

                    SizedBox(height: 5),

                    Text(data["nombre"], style: EstilosText.emailTextStyle)

                  ],
                ),
              ),
            ),

            ListTile(
              leading: Icon(Icons.person, color: Colors.white),
              title: Text("Usuarios", style: EstilosText.listTileTextStyle),
              onTap: () {
                Get.toNamed('/admin/usuarios', arguments: data);
              }
            ),

            ListTile(
              leading: Icon(Icons.comment, color: Colors.white),
              title: Text("Comentarios", style: EstilosText.listTileTextStyle),
              onTap: () {
                Get.toNamed('/admin/comentarios', arguments: data);
              }
            ),

            ListTile(
              leading: Icon(Icons.food_bank_outlined, color: Colors.white),
              title: Text("Platos", style: EstilosText.listTileTextStyle),
              onTap: () {
                Get.toNamed('/admin/platos', arguments: data);
              }
            ),

            ListTile(
              leading: Icon(Icons.question_answer, color: Colors.white),
              title: Text("Sugerencias", style: EstilosText.listTileTextStyle),
              onTap: () {
                Get.toNamed('/admin/sugerencias', arguments: data);
              }
            ),

            ListTile(
              leading: Icon(Icons.photo_album, color: Colors.white),
              title: Text("Galeria", style: EstilosText.listTileTextStyle),
              onTap: () {
                Get.toNamed('/admin/galeria', arguments: data);
              }
            ),

            Divider(color: Colors.white),

            ListTile(
              leading: Icon(Icons.sensor_door_outlined, color: Colors.white),
              title: Text("Cerrar Sesion", style: EstilosText.listTileTextStyle),
              onTap: () async {
                Get.toNamed('/');
              }
            ),

          ],
        ),
      ),
    );
  }
}