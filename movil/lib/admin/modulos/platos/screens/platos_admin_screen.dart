import 'package:flutter/material.dart';
import 'package:get/get.dart';
import '../../../../widgets/drawer_widget.dart';
import '../services/admin_platos_service.dart';
import '../../../../models/plato_model.dart';
import '../../../../utils/colors.dart';

class PlatosAdminScreen extends StatefulWidget {
  
  @override
  _PlatosAdminScreenState createState() => _PlatosAdminScreenState();
}

class _PlatosAdminScreenState extends State<PlatosAdminScreen> {

  final data = Get.arguments;

  AdminPlatosService adminPlatosService = AdminPlatosService();

  Future<List<Plato>> _platos;

  @override
  void initState() {
    super.initState();
    _platos = adminPlatosService.getAllPlatos();
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
        future: _platos,
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
        onPressed: () => Get.toNamed('/admin/platos/add', arguments: data)
      ),
    );
  }

  List<Widget> _listPlatos(List<Plato> platos) {

    List<Widget> items = [];

    for (var item in platos) {
      items.add(
        ListTile(
          title: Text(item.nombre, style: TextStyle(color: Colors.white)),
          subtitle: Text(item.precio.toString() + " Pesos", style: TextStyle(color: Colors.white)),
          onTap: () {

            Map<String, dynamic> infoPlato = {};

            infoPlato["id_plato"] = item.idPlato;
            infoPlato["nombre"] = item.nombre;
            infoPlato["precio"] = item.precio;
            infoPlato["imagen"] = item.imagen;

            Get.toNamed('/admin/platos/edit', arguments: [data, infoPlato]);

          },
            
          trailing: IconButton(

            icon: Icon(Icons.delete, color: Colors.white,),
            onPressed: () {
              adminPlatosService.deletePlato(item.idPlato);
              setState(() {
                _platos = adminPlatosService.getAllPlatos();
              });
            },

          ),
        )
            
      );
    }

    return items;

  }

}