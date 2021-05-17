import 'dart:io';
import 'package:dio/dio.dart';

class ServerApi {
  static final String apiUri = "https://servidor-telecomunicaciones.herokuapp.com";
  static final Options optionsDio = Options(
      headers: {
        HttpHeaders.contentTypeHeader: "application/json",
      }
    );
}