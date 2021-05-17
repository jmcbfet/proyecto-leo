import 'package:flutter/material.dart';
import 'package:movil/utils/colors.dart';

class ButtonWidget extends StatelessWidget {

  final Icon icon;
  final Widget btnText;
  final Function onPressed;

  ButtonWidget({ 
    @required this.icon,
    @required this.btnText,
    @required this.onPressed 
  });

  @override
  Widget build(BuildContext context) {
    return ElevatedButton(
      style: ElevatedButton.styleFrom(
        primary: Colores.colorBoton,
        onPrimary: Colores.colorTextoBoton
      ),
      child: Row(
        mainAxisAlignment: MainAxisAlignment.center,
        children: [

          icon,
          SizedBox(width: 10),
          btnText

        ],
      ),
    onPressed: onPressed
    );
  }
}