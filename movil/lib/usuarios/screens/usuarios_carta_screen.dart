import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:rflutter_alert/rflutter_alert.dart';
import '../../admin/modulos/platos/services/admin_platos_service.dart';
import '../services/usuarios_service.dart';
import '../../models/plato_model.dart';
import '../../models/comentario_model.dart';
import '../../utils/colors.dart';
import '../../utils/snackbar.dart';
import '../../widgets/input_widget.dart';

class UsuariosCartaScreen extends StatefulWidget {

  @override
  _UsuariosCartaScreenState createState() => _UsuariosCartaScreenState();
}

class _UsuariosCartaScreenState extends State<UsuariosCartaScreen> {

  final data = Get.arguments;

  Future<List<Plato>> _platos;

  AdminPlatosService adminPlatosService = AdminPlatosService();
  UsuariosService userService = UsuariosService();

  TextEditingController txtComentario = TextEditingController();

  @override
  void initState() { 
    super.initState();
    _platos = adminPlatosService.getAllPlatos();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text("Bienvenido " + data["nombre"]),
        backgroundColor: Colores.colorFondo,
      ),
      backgroundColor: Colores.colorFondo,
      body: ListView(
        children: [

          FutureBuilder(
            future: _platos,
            builder: (BuildContext context, AsyncSnapshot snapshot) {
              if (snapshot.hasData) {
                return Wrap(
                  children: _listPlatos(snapshot.data),
                );
              } else if (snapshot.hasError) {
                print(snapshot.hasError);
              }

              return Center(child: CircularProgressIndicator());
            },
          ),

        ],
      )
    );
  }

  List<Widget> _listPlatos(List<Plato> platos) {

    List<Widget> items = [];

    for (var item in platos) {
      items.add(
        Card(
          shape: RoundedRectangleBorder(
            borderRadius: BorderRadius.circular(20.0)
          ),
          child: Column(
            children: [

              Container(
                width: MediaQuery.of(context).size.width * 1,
                height: MediaQuery.of(context).size.height * 0.3,
                decoration: BoxDecoration(
                  image: DecorationImage(
                    image: NetworkImage(item.imagen)
                  )
                ),
              ),

              Text(item.idPlato.toString()),

              Text(item.nombre),

              Row(
                children: [

                  SizedBox(width: 30),

                  ElevatedButton(
                    child: Text('Agregar Comentario'),
                    onPressed: () => _alertaAgregarComentario(context, item.idPlato),
                  ),

                  SizedBox(width: 10),

                  ElevatedButton(
                    child: Text('Mirar Comentarios'),
                    onPressed: () => _alertaMirarComentarios(context, item.idPlato),
                  ),

                ],
              )
              

            ],
          ),
        )
      );
    }

    return items;

  }

   _alertaAgregarComentario(context, id) {
    Alert(
        context: context,
        title: "Formulario",
        content: Column(
          children: <Widget>[
            InputWidget(
              controller: txtComentario,
              label: "Comentario"
            )
          ],
        ),
        buttons: [
          DialogButton(
            child: Text(
              "Agregar Comentario",
              style: TextStyle(color: Colors.white, fontSize: 20),
            ),
            onPressed: () {
              if (txtComentario.text.isEmpty) {
                CustomSnackbar.display("Error", "Todos los campos son obligatorios");
              } else {
                userService.addComentario({
                  "id_plato": id,
                  "comentario": txtComentario.text
                });
              }
            },
          )
        ]).show();
  }

  _alertaMirarComentarios(context, id) {
    Alert(
        context: context,
        title: "Comentarios",
        content: Column(
          children: <Widget>[
            
            FutureBuilder(
              future: userService.getAllComentariosPorPlato(id),
              builder: (BuildContext context, AsyncSnapshot snapshot) {
                if (snapshot.hasData) {
                  return Column(
                    children: _listComentarios(snapshot.data),
                  );
                } else if (snapshot.hasError) {
                  print(snapshot.error);
                }

                return Center(child: CircularProgressIndicator());
              },
            ),

          ],
        ),
      ).show();
  }

  List<Widget> _listComentarios(List<Comentario> comentarios) {

    List<Widget> items = [];

    for (var item in comentarios) {
      items.add(
        Text(item.comentario)
      );
    }

    return items;

  }

}