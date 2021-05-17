import 'package:dio/dio.dart';
import '../../utils/snackbar.dart';
import '../../models/comentario_model.dart';
import '../../utils/server.dart';

class UsuariosService {

  Future<List<Comentario>> getAllComentariosPorPlato(int idPlato) async {

    final response = await Dio().get(ServerApi.apiUri + "/comentarios/find/$idPlato");

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
        CustomSnackbar.display("Usuario", response.data["msg"]);
      }
      
    } on DioError catch(e) {
      print(e);
    }

  }

  Future addSugerencia(Map<String, dynamic> data) async {

    try {
      final response = await Dio().post(ServerApi.apiUri + "/sugerencias/add",
        data: data,
        options: ServerApi.optionsDio
      );

      if (response.statusCode == 200) {
        CustomSnackbar.display("Usuario", response.data["msg"]);
      }
      
    } on DioError catch(e) {
      print(e);
    }

  }

}