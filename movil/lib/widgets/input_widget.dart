import 'package:flutter/material.dart';
import 'package:movil/utils/colors.dart';

class InputWidget extends StatelessWidget {

  final TextEditingController controller;
  final String label;
  final bool obscureText;

  InputWidget({ 
    @required this.controller,
    @required this.label,
    this.obscureText,
  });

  @override
  Widget build(BuildContext context) {
    return TextFormField(
      decoration: InputDecoration(
        filled: true,
        fillColor: Colores.fondoInput,
        labelText: label
      ),
      controller: controller,
      obscureText: obscureText == null ? false : true,
    );
  }
}