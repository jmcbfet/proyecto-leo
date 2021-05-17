class Comentario {
  int idComentario;
  int idPlato;
  String nombre;
  String comentario;

  Comentario({this.idComentario, this.idPlato, this.nombre, this.comentario});

  Comentario.fromJson(Map<String, dynamic> json) {
    idComentario = json['id_comentario'];
    idPlato = json['id_plato'];
    nombre = json['nombre'];
    comentario = json['comentario'];
  }

  Map<String, dynamic> toJson() {
    final Map<String, dynamic> data = new Map<String, dynamic>();
    data['id_comentario'] = this.idComentario;
    data['id_plato'] = this.idPlato;
    data['nombre'] = this.nombre;
    data['comentario'] = this.comentario;
    return data;
  }
}