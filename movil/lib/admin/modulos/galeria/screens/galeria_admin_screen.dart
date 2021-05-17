import 'package:flutter/material.dart';
import 'package:get/get.dart';
import '../../../../widgets/drawer_widget.dart';
import '../services/admin_galeria_service.dart';
import '../../../../models/galeria_model.dart';
import '../../../../utils/colors.dart';

class GaleriaAdminScreen extends StatefulWidget {
  
  @override
  _GaleriaAdminScreenState createState() => _GaleriaAdminScreenState();
}

class _GaleriaAdminScreenState extends State<GaleriaAdminScreen> {

  final data = Get.arguments;

  AdminGaleriaService adminGaleriaService = AdminGaleriaService();

  Future<List<Galeria>> _galeria;

  @override
  void initState() {
    super.initState();
    _galeria = adminGaleriaService.getAllGaleria();
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
        future: _galeria,
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
        onPressed: () => Get.toNamed('/admin/galeria/add', arguments: data)
      ),
    );
  }

  List<Widget> _listPlatos(List<Galeria> galeria) {

    List<Widget> items = [];

    for (var item in galeria) {
      items.add(
        ListTile(
          title: Text(item.altText, style: TextStyle(color: Colors.white)),
          subtitle: Text(item.caption, style: TextStyle(color: Colors.white)),
          onTap: () {

            Map<String, dynamic> infoGaleria = {};

            infoGaleria["id_galeria"] = item.idGaleria;
            infoGaleria["src"] = item.src;
            infoGaleria["altText"] = item.altText;
            infoGaleria["caption"] = item.caption;

            Get.toNamed('/admin/galeria/edit', arguments: [data, infoGaleria]);

          },
            
          trailing: IconButton(

            icon: Icon(Icons.delete, color: Colors.white,),
            onPressed: () {
              adminGaleriaService.deleteGaleria(item.idGaleria);
              setState(() {
                _galeria = adminGaleriaService.getAllGaleria();
              });
            },

          ),
        )
            
      );
    }

    return items;

  }

}