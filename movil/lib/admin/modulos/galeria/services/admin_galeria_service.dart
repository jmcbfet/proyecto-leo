import 'package:dio/dio.dart';
import '../../../../utils/snackbar.dart';
import '../../../../models/galeria_model.dart';
import '../../../../utils/server.dart';

class AdminGaleriaService {

  Future<List<Galeria>> getAllGaleria() async {

    final response = await Dio().get(ServerApi.apiUri + "/galeria/find");

    List<Galeria> galeria = [];

    for(var item in response.data) {
      galeria.add(
        Galeria(
          idGaleria: item["id_galeria"],
          src: item["src"],
          altText: item["altText"],
          caption: item["caption"]
        )
      );
    }

    return galeria;

  }

  Future addGaleria(Map<String, dynamic> data) async {

    try {
      final response = await Dio().post(ServerApi.apiUri + "/galeria/add",
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

  Future editGaleria(int id, Map<String, dynamic> data) async {

    try {
      final response = await Dio().put(ServerApi.apiUri + "/galeria/update/$id",
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

  Future deleteGaleria(int id) async {

    try {
      final response = await Dio().delete(ServerApi.apiUri + "/galeria/delete/$id");

      if (response.statusCode == 200) {
        CustomSnackbar.display("Admin", response.data["msg"]);
      }

    } on DioError catch(e) {
      print(e);
    }

  }

}