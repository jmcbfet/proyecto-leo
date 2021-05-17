import 'package:flutter/material.dart';
import 'package:get/get.dart';
import '../../widgets/input_widget.dart';
import '../../widgets/button_widget.dart';
import '../../widgets/circulo_widget.dart';
import '../services/auth_service.dart';
import '../../utils/colors.dart';
import '../../utils/snackbar.dart';

class LoginScreen extends StatefulWidget {
  @override
  _LoginScreenState createState() => _LoginScreenState();
}

class _LoginScreenState extends State<LoginScreen> {

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
                        height: MediaQuery.of(context).size.height * 0.4,
                        child: Column(
                          children: [
                            Column(
                              children: [

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
                                  icon: Icon(Icons.person),
                                  btnText: Text("LOGIN"),
                                  onPressed: () {
                                    if (txtEmail.text.isEmpty || txtPassword.text.isEmpty) {
                                      CustomSnackbar.display("Error", "Todos los campos son obligatorios");
                                    } else if (!txtEmail.text.isEmail) {
                                      CustomSnackbar.display("Error", "El correo no es valido");
                                    } else {
                                      authService.loginUser({
                                        "correo": txtEmail.text,
                                        "password": txtPassword.text
                                      });
                                    }
                                  },
                                ),
                                
                                SizedBox(height: 10),

                                ButtonWidget(
                                  icon: Icon(Icons.app_registration), 
                                  btnText: Text("REGISTRARSE"), 
                                  onPressed: () {
                                    Get.toNamed('/registro');
                                  }
                                )

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