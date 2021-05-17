import 'package:flutter/material.dart';
import 'package:get/get.dart';
import '../../widgets/input_widget.dart';
import '../../widgets/button_widget.dart';
import '../../widgets/circulo_widget.dart';
import '../services/auth_service.dart';
import '../../utils/colors.dart';
import '../../utils/snackbar.dart';

class RegistroScreen extends StatefulWidget {
  @override
  _RegistroScreenState createState() => _RegistroScreenState();
}

class _RegistroScreenState extends State<RegistroScreen> {

  TextEditingController txtNombre = TextEditingController();
  TextEditingController txtApellido = TextEditingController();
  TextEditingController txtEmail = TextEditingController();
  TextEditingController txtPassword = TextEditingController();

  AuthService authService = AuthService();
  CustomSnackbar customSnackbar = CustomSnackbar();

  @override
  Widget build(BuildContext context) {

    return Scaffold(
      body: SafeArea(
        child: Container(
          width: MediaQuery.of(context).size.width,
          height: MediaQuery.of(context).size.height,
          decoration: BoxDecoration(
            color: Colores.colorFondo
          ),
          child: SingleChildScrollView(
            child: Stack(
              children: [

                Positioned(right: -70, bottom: -50, child: CirculoWidget()),
                Positioned(left: -70, bottom: -50, child: CirculoWidget()),
                Positioned(left: -70, top: -50, child: CirculoWidget()),
                Positioned(right: -70, top: -50, child: CirculoWidget()),

                Container(
                  width: MediaQuery.of(context).size.width,
                  height: MediaQuery.of(context).size.height,
                  margin: EdgeInsets.only(top: 12),
                  child: Column(
                    mainAxisAlignment: MainAxisAlignment.center,
                    children: [
                      Container(
                        width: MediaQuery.of(context).size.width * 0.8,
                        height: MediaQuery.of(context).size.height * 0.6,
                        child: Column(
                          children: [
                            Column(
                              children: [

                                InputWidget(
                                  controller: txtNombre,
                                  label: "Nombre"
                                ),

                                SizedBox(height: 10),

                                InputWidget(
                                  controller: txtApellido,
                                  label: "Apellido"
                                ),

                                SizedBox(height: 10),

                                InputWidget(
                                  controller: txtEmail,
                                  label: "Email",
                                ),

                                SizedBox(height: 10),

                                InputWidget(
                                  controller: txtPassword,
                                  label: "Contraseña",
                                  obscureText: true,
                                ),

                                SizedBox(height: 10),

                                ButtonWidget(
                                  icon: Icon(Icons.arrow_back),
                                  btnText: Text("VOLVER AL LOGIN"),
                                  onPressed: () => Get.toNamed('/')
                                ),

                                SizedBox(height: 10),

                                ButtonWidget(
                                  icon: Icon(Icons.app_registration),
                                  btnText: Text("REGISTRAR"),
                                  onPressed: () {
                                    if (txtNombre.text.isEmpty || txtApellido.text.isEmpty || txtEmail.text.isEmpty || txtPassword.text.isEmpty) {
                                      CustomSnackbar.display("Error", "Los campos son obligatorios");
                                    }
                                    else if (!txtEmail.text.isEmail) {
                                      CustomSnackbar.display("Error", "El correo no es valido");
                                    }
                                    else if (txtPassword.text.length < 6) {
                                      CustomSnackbar.display("Error", "La contraseña debe tener minimo 6 caracteres");
                                    } else {
                                      authService.registerUser({
                                        "nombre": txtNombre.text,
                                        "apellido": txtApellido.text,
                                        "correo": txtEmail.text,
                                        "password": txtPassword.text,
                                        "id_rol": 2
                                      });
                                    }
                                  }
                                ),

                              ],
                            )
                          ],
                        ),
                      )

                    ],
                  ),
                ),

              ],
            )
          ),
        ),
      ),
    );
  }

}