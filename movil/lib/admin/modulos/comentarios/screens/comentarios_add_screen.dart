import 'package:dio/dio.dart';
import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:movil/utils/server.dart';
import '../services/admin_comentarios_service.dart';
import '../../platos/services/admin_platos_service.dart';
import '../../../../widgets/button_widget.dart';
import '../../../../widgets/input_widget.dart';
import '../../../../widgets/drawer_widget.dart';
import '../../../../utils/snackbar.dart';
import '../../../../utils/colors.dart';

class ComentariosAddScreen extends StatefulWidget {

  @override
  _ComentariosAddScreenState createState() => _ComentariosAddScreenState();
}

class _ComentariosAddScreenState extends State<ComentariosAddScreen> {

  final data = Get.arguments;

  TextEditingController txtComentario = TextEditingController();

  AdminComentariosService adminComentariosService = AdminComentariosService();
  AdminPlatosService adminPlatosService = AdminPlatosService();

  String valueDropdown;
  List itemList = [];

  Future getPlatos() async {
    final response = await Dio().get(ServerApi.apiUri + "/platos/find");
    if (response.statusCode == 200) {
      setState(() {
        itemList = response.data;
      });
      print(itemList);
    }
  }

  @override
  void initState() { 
    super.initState();
    getPlatos();
  }

  @override
  Widget build(BuildContext context) {

    return Scaffold(
      appBar: AppBar(
        title: Text("Agregar Comentario"),
        backgroundColor: Colores.colorFondo,
        actions: [
          IconButton(
            icon: Icon(Icons.arrow_back, color: Colors.white),
            onPressed: () => Get.toNamed('/admin/comentarios', arguments: data)
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

            DropdownButtonFormField(
              decoration: InputDecoration(
                filled: true,
                fillColor: Colors.white,
                labelText: "Plato"
              ),
              value: valueDropdown,
              items: itemList.map((plato) {
                print(plato);
                return DropdownMenuItem(
                  value: plato["id_plato"].toString(),
                  child: Text(plato["nombre"]),
                );
              }).toList(),
              onChanged: (value) {
                setState(() {
                  valueDropdown = value;
                  print(valueDropdown);
                });
              },
            ),

            SizedBox(height: 10),

            InputWidget(
              controller: txtComentario, 
              label: 'Comentario'
            ),

            SizedBox(height: 10),

            ButtonWidget(
              icon: Icon(Icons.save),
              btnText: Text("AGREGAR"), 
              onPressed: () {
                if (txtComentario.text.isEmpty) {
                  CustomSnackbar.display("Error", "Todos los campos son obligatorios");
                }else {
                  adminComentariosService.addComentario({
                    "id_plato": valueDropdown,
                    "comentario": txtComentario.text
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