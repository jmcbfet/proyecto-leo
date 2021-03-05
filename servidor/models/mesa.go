package models

type Mesa struct {
	IdMesa 			int    	`json:"id_mesa" db:"id_mesa"`
	Descripcion		string 	`json:"descripcion" db:"descripcion"`
	Disponible		int		`json:"disponible" db:"disponible"`
}

type AgregarMesa struct {
	Descripcion		string 	`json:"descripcion" db:"descripcion"`
}