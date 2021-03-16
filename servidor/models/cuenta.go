package models

type Cuenta struct {
	IdCuenta 		int		`json:"id_cuenta" db:"id_cuenta"`
	Descripcion		string	`json:"descripcion" db:"descripcion"`
	NombrePlato		string 	`json:"nombre" db:"nombre"`
	Usuario 		string  `json:"apellido" db:"apellido"`
	IdUsuario		int		`json:"id_usuario" db:"id_usuario"`
	Precio			int		`json:"precio" db:"precio"`
}

type AgregarCuenta struct {
	IdMesa  int `json:"id_mesa" db:"id_mesa"` 
	IdPlato int `json:"id_plato" db:"id_plato"`
	IdUsuario int `json:"id_usuario" db:"id_usuario"`
}

type ConsultarCuenta struct {
	IdUsuario int `json:"id_usuario" db:"id_usuario"`
	IdMesa int `json:"id_mesa" db:"id_mesa"`
}

type TotalReserva struct {
	Total int `json:"total" db:"total"`
}

type TotalCuentaMes struct {
	TotalMes int `json:"total_mes" db:"total_mes"`
}

type ListarAnos struct {
	Year int `json:"year" db:"year"`
}