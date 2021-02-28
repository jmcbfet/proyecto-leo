package models

type Plato struct {
	Id 	   		int		`json:"id_plato" db:"id_plato"`
	Nombre 		string 	`json:"nombre" db:"nombre"`
	Precio 		int 	`json:"precio" db:"precio"`
	Imagen 		string 	`json:"imagen" db:"imagen"`
}

type AgregarPlato struct {
	Nombre 		string 		`json:"nombre" db:"nombre"`
	Precio 		int 	  	`json:"precio" db:"precio"`
	Imagen 		string 		`json:"imagen" db:"imagen"`
}