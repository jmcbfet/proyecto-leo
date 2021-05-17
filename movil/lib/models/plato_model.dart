class Plato {
  int idPlato;
  String nombre;
  int precio;
  String imagen;

  Plato({this.idPlato, this.nombre, this.precio, this.imagen});

  Plato.fromJson(Map<String, dynamic> json) {
    idPlato = json['id_plato'];
    nombre = json['nombre'];
    precio = json['precio'];
    imagen = json['imagen'];
  }

  Map<String, dynamic> toJson() {
    final Map<String, dynamic> data = new Map<String, dynamic>();
    data['id_plato'] = this.idPlato;
    data['nombre'] = this.nombre;
    data['precio'] = this.precio;
    data['imagen'] = this.imagen;
    return data;
  }
}