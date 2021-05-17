import 'package:flutter/material.dart';
import 'package:get/get.dart';
import '../../../../widgets/drawer_widget.dart';
import '../services/admin_sugerencias_service.dart';
import '../../../../models/sugerencia_model.dart';
import '../../../../utils/colors.dart';

class SugerenciasAdminScreen extends StatefulWidget {
  
  @override
  _SugerenciasAdminScreenState createState() => _SugerenciasAdminScreenState();
}

class _SugerenciasAdminScreenState extends State<SugerenciasAdminScreen> {

  final data = Get.arguments;

  AdminSugerenciasService adminSugerenciasService = AdminSugerenciasService();

  Future<List<Sugerencia>> _sugerencias;

  @override
  void initState() {
    super.initState();
    _sugerencias = adminSugerenciasService.getAllSugerencias();
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
        future: _sugerencias,
        builder: (BuildContext context, AsyncSnapshot snapshot) {
          if (snapshot.hasData) {
            return ListView(
              children: _listPlatos(snapshot.data),
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
        onPressed: () => Get.toNamed('/admin/sugerencias/add', arguments: data)
      ),
    );
  }

  List<Widget> _listPlatos(List<Sugerencia> sugerencias) {

    List<Widget> items = [];

    for (var item in sugerencias) {
      items.add(
        ListTile(
          title: Text(item.correo, style: TextStyle(color: Colors.white)),
          subtitle: Text(item.descripcion, style: TextStyle(color: Colors.white)),
          onTap: () {

            Map<String, dynamic> infoSugerencia = {};

            infoSugerencia["id_sugerencia"] = item.idSugerencia;
            infoSugerencia["correo"] = item.correo;
            infoSugerencia["descripcion"] = item.descripcion;

            Get.toNamed('/admin/sugerencias/edit', arguments: [data, infoSugerencia]);

          },
            
          trailing: IconButton(

            icon: Icon(Icons.delete, color: Colors.white,),
            onPressed: () {
              adminSugerenciasService.deleteSugerencia(item.idSugerencia);
              setState(() {
                _sugerencias= adminSugerenciasService.getAllSugerencias();
              });
            },

          ),
        )
            
      );
    }

    return items;

  }

}