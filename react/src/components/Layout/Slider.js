import React, { useContext, useEffect } from 'react';
import { Carousel } from 'react-bootstrap';
import DashboardContext from '../../context/dashboard/dashboardContext';

const Slider = () => {

  useEffect(() => {
    ListarGaleria();
  }, [])

  const dashboardContext = useContext(DashboardContext);
  const { galeria, ListarGaleria } = dashboardContext

  return (
    <div>
      <Carousel>
        {galeria ?
          galeria.map(foto => {
            return (
              <Carousel.Item key={foto.id_galeria}>
                <img
                  src={foto.src}
                  alt={foto.altText}
                  style={{ width: '100%', height: '400px' }}
                />
                <Carousel.Caption>
                  {foto.caption}
                </Carousel.Caption>
              </Carousel.Item>
            )
          })
          : <p>aaa</p>}
      </Carousel>
    </div>
  )

}

export default Slider;