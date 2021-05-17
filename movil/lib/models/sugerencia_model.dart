class Sugerencia {
  int idSugerencia;
  String correo;
  String descripcion;

  Sugerencia({this.idSugerencia, this.correo, this.descripcion});

  Sugerencia.fromJson(Map<String, dynamic> json) {
    idSugerencia = json['id_sugerencia'];
    correo = json['correo'];
    descripcion = json['descripcion'];
  }

  Map<String, dynamic> toJson() {
    final Map<String, dynamic> data = new Map<String, dynamic>();
    data['id_sugerencia'] = this.idSugerencia;
    data['correo'] = this.correo;
    data['descripcion'] = this.descripcion;
    return data;
  }
}