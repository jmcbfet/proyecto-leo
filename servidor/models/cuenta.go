package models

type Cuenta struct {
	IdCuenta 		int		`json:"id_cuenta" db:"id_cuenta"`
	Descripcion		string	`json:"descripcion" db:"descripcion"`
	NombrePlato		string 	`json:"nombre" db:"nombre"`
}

type AgregarCuenta struct {
	IdMesa		int		`json:"id_mesa" db:"id_mesa"`
	IdPlato		int 	`json:"id_plato" db:"id_plato"`
}