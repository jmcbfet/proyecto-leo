package models

type Usuario struct {
	Id		 	int    `json:"id_usuario" db:"id_usuario"`
	Nombre   	string `json:"nombre" db:"nombre"`
	Apellido 	string `json:"apellido" db:"apellido"`
	Correo   	string `json:"correo" db:"correo"`
	Password 	string `json:"password" db:"password"`
	Rol      	int    `json:"id_rol" db:"id_rol"`
	Descripcion string `json:"descripcion" db:"descripcion"`
}

type AgregarUsuario struct {
	Nombre   	string `json:"nombre" db:"nombre"`
	Apellido 	string `json:"apellido" db:"apellido"`
	Correo   	string `json:"correo" db:"correo"`
	Password 	string `json:"password" db:"password"`
	Rol      	int    `json:"id_rol" db:"id_rol"`
}