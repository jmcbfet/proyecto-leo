import 'package:flutter/material.dart';
import 'package:get/get.dart';
import '../../widgets/button_widget.dart';
import '../../widgets/carousel_widget.dart';
import '../../admin/modulos/galeria/services/admin_galeria_service.dart';
import '../../models/galeria_model.dart';
import '../../utils/colors.dart';

class UsuariosScreen extends StatefulWidget {

  @override
  _UsuariosScreenState createState() => _UsuariosScreenState();
}

class _UsuariosScreenState extends State<UsuariosScreen> {

  Future<List<Galeria>> _galeria;

  final data = Get.arguments;

  AdminGaleriaService adminGaleriaService = AdminGaleriaService();

  @override
  void initState() { 
    super.initState();
    _galeria = adminGaleriaService.getAllGaleria();
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

          SizedBox(height: 10.0),

          FutureBuilder(
            future: _galeria,
            builder: (BuildContext context, AsyncSnapshot snapshot) {

              if (snapshot.hasData) {
                return CarouselWidget(
                  items: _listGaleria(snapshot.data),
                );
              } else if (snapshot.hasError) {
                print(snapshot.error);
              }

              return Center(child: CircularProgressIndicator());

            },
          ),

          Wrap(
            children: [

              ButtonWidget(
                icon: Icon(Icons.food_bank_outlined), 
                btnText: Text("Mirar Carta"), 
                onPressed: () => Get.toNamed('/user/carta', arguments: data)
              ),

              ButtonWidget(
                icon: Icon(Icons.question_answer), 
                btnText: Text("Hacer Sugerencia"), 
                onPressed: () => Get.toNamed('/user/sugerencias', arguments: data)
              ),

            ],
          ),

        ],
      )
    );
  }

  List<Widget>_listGaleria(List<Galeria> galeria) {

    List<Widget> fotos = [];

    for (var item in galeria) {
      fotos.add(
        Container(
          margin: EdgeInsets.all(5.0),
          width: MediaQuery.of(context).size.width * 1,
          decoration: BoxDecoration(
            borderRadius: BorderRadius.circular(10.0),
            image: DecorationImage(
              image: NetworkImage(item.src),
              fit: BoxFit.cover
            )
          ),
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            
            children: [

              SizedBox(height: 105),

              Container(
                width: MediaQuery.of(context).size.width * 1,
                height: MediaQuery.of(context).size.height * 0.05,
                decoration: BoxDecoration(
                  color: Colors.white
                ),
                child: Column(
                  children: [

                    Text(item.altText),
                    Text(item.caption)

                  ],
                ),
              )

            ],
          ),
        )
      );
    }

    return fotos;

  }

}