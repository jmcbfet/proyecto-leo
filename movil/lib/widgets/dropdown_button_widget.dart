import 'package:flutter/material.dart';
import '../utils/colors.dart';

class DropdownButtonFormFieldWidget extends StatelessWidget {

  final String label;
  final String value;
  final List<String> items;
  final Function onChanged;

  DropdownButtonFormFieldWidget({ 
    @required this.label,
    @required this.value,
    @required this.items,
    @required this.onChanged
  });

  @override
  Widget build(BuildContext context) {
    return DropdownButtonFormField(
      decoration: InputDecoration(
        filled: true,
        fillColor: Colores.fondoInput,
        labelText: label
      ),
      value: value,
      onChanged: onChanged,
      items: items.map((value) {
        return DropdownMenuItem(
          value: value,
          child: Text(value)
        );
      }).toList()
    );
  }
}