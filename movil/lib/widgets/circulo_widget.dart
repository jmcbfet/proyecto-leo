import 'package:flutter/material.dart';
import 'package:movil/utils/colors.dart';

class CirculoWidget extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Container(
      width: MediaQuery.of(context).size.width * 0.4,
      height: MediaQuery.of(context).size.height * 0.3,
      decoration: BoxDecoration(
        color: Colores.colorCirculo,
        shape: BoxShape.circle
      ),
    );
  }
}