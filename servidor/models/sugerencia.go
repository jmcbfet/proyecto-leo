package models

type Sugerencia struct {
	Id 				int    	`json:"id_sugerencia" db:"id_sugerencia"`
	Correo 			string 	`json:"correo" db:"correo"`
	Descripcion 	string 	`json:"descripcion" db:"descripcion"`
}

type AgregarSugerencia struct {
	Correo 			string 	`json:"correo" db:"correo"`
	Descripcion 	string 	`json:"descripcion" db:"descripcion"`
}