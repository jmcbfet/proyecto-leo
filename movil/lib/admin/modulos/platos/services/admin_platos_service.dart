import 'package:dio/dio.dart';
import '../../../../utils/snackbar.dart';
import '../../../../models/plato_model.dart';
import '../../../../utils/server.dart';

class AdminPlatosService {

  Future<List<Plato>> getAllPlatos() async {

    final response = await Dio().get(ServerApi.apiUri + "/platos/find");

    List<Plato> platos = [];

    for(var item in response.data) {
      platos.add(
        Plato(
          idPlato: item["id_plato"],
          nombre: item["nombre"],
          precio: item["precio"],
          imagen: item["imagen"]
        )
      );
    }

    return platos;

  }

  Future addPlato(Map<String, dynamic> data) async {

    try {
      final response = await Dio().post(ServerApi.apiUri + "/platos/add",
        data: data,
        options: ServerApi.optionsDio
      );

      if (response.statusCode == 200) {
        CustomSnackbar.display("Admin", response.data["msg"]);
      }
      
    } on DioError catch(e) {
      print(e);
    }

  }

  Future editPlato(int id, Map<String, dynamic> data) async {

    try {
      final response = await Dio().put(ServerApi.apiUri + "/platos/update/$id",
        data: data,
        options: ServerApi.optionsDio
      );

      if (response.statusCode == 200) {
        CustomSnackbar.display("Admin", response.data["msg"]);
      }

    } on DioError catch(e) {
      print(e);
    }

  }

  Future deletePlato(int id) async {

    try {
      final response = await Dio().delete(ServerApi.apiUri + "/platos/delete/$id");

      if (response.statusCode == 200) {
        CustomSnackbar.display("Admin", response.data["msg"]);
      }

    } on DioError catch(e) {
      print(e);
    }

  }

}