class User {
  int idUsuario;
  String nombre;
  String apellido;
  String correo;
  String password;
  int idRol;
  String descripcion;

  User({
      this.idUsuario,
      this.nombre,
      this.apellido,
      this.correo,
      this.password,
      this.idRol,
      this.descripcion
  });

  User.fromJson(Map<String, dynamic> json) {
    idUsuario = json['id_usuario'];
    nombre = json['nombre'];
    apellido = json['apellido'];
    correo = json['correo'];
    password = json['password'];
    idRol = json['id_rol'];
    descripcion = json['descripcion'];
  }

  Map<String, dynamic> toJson() {
    final Map<String, dynamic> data = new Map<String, dynamic>();
    data['id_usuario'] = this.idUsuario;
    data['nombre'] = this.nombre;
    data['apellido'] = this.apellido;
    data['correo'] = this.correo;
    data['password'] = this.password;
    data['id_rol'] = this.idRol;
    data['descripcion'] = this.descripcion;
    return data;
  }
}
