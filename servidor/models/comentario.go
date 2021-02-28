package models

type Comentario struct {
	IdComentario	int    `json:"id_comentario" db:"id_comentario"`
	IdPlato 		int    `json:"id_plato" db:"id_plato"`
	NombrePlato		string `json:"nombre" db:"nombre"`
	Comentario 		string `json:"comentario" db:"comentario"`
}

type AgregarComentario struct {
	IdPlato 	int 	`json:"id_plato" db:"id_plato"`
	Comentario 	string 	`json:"comentario" db:"comentario"`
}