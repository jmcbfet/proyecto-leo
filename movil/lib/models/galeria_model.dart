class Galeria {
  int idGaleria;
  String src;
  String altText;
  String caption;

  Galeria({this.idGaleria, this.src, this.altText, this.caption});

  Galeria.fromJson(Map<String, dynamic> json) {
    idGaleria = json['id_galeria'];
    src = json['src'];
    altText = json['altText'];
    caption = json['caption'];
  }

  Map<String, dynamic> toJson() {
    final Map<String, dynamic> data = new Map<String, dynamic>();
    data['id_galeria'] = this.idGaleria;
    data['src'] = this.src;
    data['altText'] = this.altText;
    data['caption'] = this.caption;
    return data;
  }
}