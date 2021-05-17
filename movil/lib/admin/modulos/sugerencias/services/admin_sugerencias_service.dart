import 'package:dio/dio.dart';
import '../../../../utils/snackbar.dart';
import '../../../../models/sugerencia_model.dart';
import '../../../../utils/server.dart';

class AdminSugerenciasService {

  Future<List<Sugerencia>> getAllSugerencias() async {

    final response = await Dio().get(ServerApi.apiUri + "/sugerencias/find");

    List<Sugerencia> sugerencias = [];

    for(var item in response.data) {
      sugerencias.add(
        Sugerencia(
          idSugerencia: item["id_sugerencia"],
          correo: item["correo"],
          descripcion: item["descripcion"]
        )
      );
    }

    return sugerencias;

  }

  Future addSugerencia(Map<String, dynamic> data) async {

    try {
      final response = await Dio().post(ServerApi.apiUri + "/sugerencias/add",
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

  Future editSugerencia(int id, Map<String, dynamic> data) async {

    try {
      final response = await Dio().put(ServerApi.apiUri + "/sugerencias/update/$id",
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

  Future deleteSugerencia(int id) async {

    try {
      final response = await Dio().delete(ServerApi.apiUri + "/sugerencias/delete/$id");

      if (response.statusCode == 200) {
        CustomSnackbar.display("Admin", response.data["msg"]);
      }

    } on DioError catch(e) {
      print(e);
    }

  }

}