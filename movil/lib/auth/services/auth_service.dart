import 'package:dio/dio.dart';
import 'package:get/get.dart';
import '../../utils/server.dart';
import '../../utils/snackbar.dart';

class AuthService {

  CustomSnackbar customSnackbar = CustomSnackbar();

  Future registerUser(Map<String, dynamic> data) async {

    try {
      final response = await Dio().post(ServerApi.apiUri + "/user/add",
        data: data, 
        options: ServerApi.optionsDio
      );

      CustomSnackbar.display("Usuario", response.data["msg"]);

    } on DioError catch(e) {
      print(e);
    }
  }

  Future loginUser(Map<String, String> data) async {
    
    try {
      final response = await Dio().post(ServerApi.apiUri + "/user/login",
        data: data,
        options: ServerApi.optionsDio
      );

      print(response.data[0]);

      if (response.statusCode == 200) {
        if (response.data[0]["id_rol"] == 1) {
          Get.toNamed('/admin', arguments: response.data[0]);
        } else {
          Get.toNamed('/user', arguments: response.data[0]);
        }
      } else if (response.statusCode == 201) {
        CustomSnackbar.display("Error", response.data["msg"]);
      }

    } on DioError catch(e) {
      print(e);
    }
  }

}