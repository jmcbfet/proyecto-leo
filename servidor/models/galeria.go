package models

type Galeria struct {
	Id 			int 	`json:"id_galeria" db:"id_galeria"`
	Src 		string 	`json:"src" db:"src"`
	AltText 	string 	`json:"altText" db:"altText"`
	Caption 	string 	`json:"caption" db:"caption"`
}

type AgregarGaleria struct {
	Src 		string 	`json:"src" db:"src"`
	AltText 	string 	`json:"altText" db:"altText"`
	Caption 	string 	`json:"caption" db:"caption"`
}