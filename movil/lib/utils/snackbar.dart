import 'package:get/get.dart';
import 'colors.dart';

class CustomSnackbar {

  static final Function display = (String titulo, String descripcion) {
    Get.snackbar(titulo, descripcion,
      backgroundColor: Colores.snackbarFondo,
      snackPosition: SnackPosition.BOTTOM,
    );
  };

}