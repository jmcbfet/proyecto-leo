import 'package:flutter/material.dart';
import 'package:get/get.dart';
import '../../../../widgets/drawer_widget.dart';
import '../services/admin_comentarios_service.dart';
import '../../../../models/comentario_model.dart';

import '../../../../utils/colors.dart';

class ComentariosAdminScreen extends StatefulWidget {
  
  @override
  _ComentariosAdminScreenState createState() => _ComentariosAdminScreenState();
}

class _ComentariosAdminScreenState extends State<ComentariosAdminScreen> {

  final data = Get.arguments;

  AdminComentariosService adminComentarioService = AdminComentariosService();

  Future<List<Comentario>> _comentarios;

  @override
  void initState() {
    super.initState();
    _comentarios = adminComentarioService.getAllComentarios();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text("Admin"),
        backgroundColor: Colores.colorBoton,
      ),
      drawer: DrawerWidget(
        data: data,
      ),
      backgroundColor: Colores.colorFondo,
      body: FutureBuilder(
        future: _comentarios,
        builder: (BuildContext context, AsyncSnapshot snapshot) {
          if (snapshot.hasData) {
            return ListView(
              children: _listComentarios(snapshot.data),
            );
          } else if (snapshot.hasError) {
              print(snapshot.error);
          }

          return Center(child: CircularProgressIndicator());
        },
      ),
      floatingActionButton: FloatingActionButton(
        child: Icon(Icons.add),
        backgroundColor: Colores.colorBoton,
        onPressed: () => Get.toNamed('/admin/comentarios/add', arguments: data)
      ),
    );
  }

  List<Widget> _listComentarios(List<Comentario> comentarios) {

    List<Widget> items = [];

    for (var item in comentarios) {
      items.add(
        ListTile(
          title: Text(item.nombre, style: TextStyle(color: Colors.white)),
          subtitle: Text(item.comentario, style: TextStyle(color: Colors.white)),
          onTap: () {

            Map<String, dynamic> infoComentario = {};

            infoComentario["id_comentario"] = item.idComentario;
            infoComentario["id_plato"] = item.idPlato;
            infoComentario["nombre"] = item.nombre;
            infoComentario["comentario"] = item.comentario;

            Get.toNamed('/admin/comentarios/edit', arguments: [data, infoComentario]);

          },
            
          trailing: IconButton(

            icon: Icon(Icons.delete, color: Colors.white,),
            onPressed: () {
              
              adminComentarioService.deleteComentario(item.idComentario);
              setState(() {
                _comentarios = adminComentarioService.getAllComentarios();
              });
            },

          ),
        )
            
      );
    }

    return items;

  }

}