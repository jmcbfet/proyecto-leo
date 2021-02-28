package models

type Reserva struct {
	IdReserva 		int 	`json:"id_reserva" db:"id_reserva"`
	Descripcion		string 	`json:"descripcion" db:"descripcion"`
	Nombre			string 	`json:"nombre" db:"nombre"`
	Apellido		string 	`json:"apellido" db:"apellido"`
	FechaReserva	string 	`json:"fecha_reserva" db:"fecha_reserva"` 
}

type AgregarReserva struct {
	IdMesa			int 	`json:"id_mesa" db:"id_mesa"`
	IdUsuario		int 	`json:"id_usuario" db:"id_usuario"`
}