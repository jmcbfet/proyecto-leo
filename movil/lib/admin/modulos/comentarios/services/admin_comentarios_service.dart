import 'package:dio/dio.dart';
import '../../../../utils/snackbar.dart';
import '../../../../models/comentario_model.dart';
import '../../../../utils/server.dart';

class AdminComentariosService {

  Future<List<Comentario>> getAllComentarios() async {

    final response = await Dio().get(ServerApi.apiUri + "/comentarios/find");

    List<Comentario> comentarios = [];

    for(var item in response.data) {
      comentarios.add(
        Comentario(
          idComentario: item["id_comentario"],
          idPlato: item["id_plato"],
          nombre: item["nombre"],
          comentario: item["comentario"]
        )
      );
    }

    return comentarios;

  }

  Future addComentario(Map<String, dynamic> data) async {

    try {
      final response = await Dio().post(ServerApi.apiUri + "/comentarios/add",
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

  Future editComentario(int id, Map<String, dynamic> data) async {

    try {
      final response = await Dio().put(ServerApi.apiUri + "/comentarios/update/$id",
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

  Future deleteComentario(int id) async {

    try {
      final response = await Dio().delete(ServerApi.apiUri + "/comentarios/delete/$id");

      if (response.statusCode == 200) {
        CustomSnackbar.display("Admin", response.data["msg"]);
      }

    } on DioError catch(e) {
      print(e);
    }

  }

}