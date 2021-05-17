import 'package:dio/dio.dart';
import '../../../../utils/snackbar.dart';
import '../../../../models/user_model.dart';
import '../../../../utils/server.dart';

class AdminUserService {

  Future<List<User>> getAllUsers() async {

    final response = await Dio().get(ServerApi.apiUri + "/user/find");

    List<User> users = [];

    for(var item in response.data) {
      users.add(
        User(
          idUsuario: item["id_usuario"],
          nombre: item["nombre"],
          apellido: item["apellido"],
          correo: item["correo"],
          descripcion: item["descripcion"],
          password: item["password"],
          idRol: item["id_rol"]
        )
      );
    }

    return users;

  }

  Future addUser(Map<String, dynamic> data) async {

    try {
      final response = await Dio().post(ServerApi.apiUri + "/user/add",
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

  Future editUser(int id, Map<String, dynamic> data) async {

    try {
      final response = await Dio().put(ServerApi.apiUri + "/user/update/$id",
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

  Future deleteUser(int id) async {

    try {
      final response = await Dio().delete(ServerApi.apiUri + "/user/delete/$id");

      if (response.statusCode == 200) {
        CustomSnackbar.display("Admin", response.data["msg"]);
      }

    } on DioError catch(e) {
      print(e);
    }

  }

}