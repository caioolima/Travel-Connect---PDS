import React from 'react';
import { Link } from 'react-router-dom'; // Importe Link para criar links
import imagemTermosServico from '../images/imagemTermosServico.jpg';
import imagemPoliticaPrivacidade from '../images/imagemPoliticaPrivacidade.jpg';
import imagemRegrasComunidade from '../images/imagemRegrasComunidade.jpg'
import { useTranslation } from "react-i18next";

import "../Terms/terms.css"; // Supondo que seus estilos estejam em um arquivo chamado terms.css

    

function Terms() {
    const { t } = useTranslation();
  return (
    <div>
      <div className="logo">
        <Link to="/">TravelConnect</Link>
      </div>
      <hr />
      <div className="container">
        <p className="main-paragraph">{t("main_heading")}</p>
        <h1 className="main-heading">{t("sub_heading")}</h1>

        <h2 className="section-heading">{t("section_heading")}</h2>
    </div>
        
        <div className="image-container">
          <div className="image-with-text">
          <Link to="/service">
            <img src={imagemTermosServico} alt="Termos de Serviço" className="term-image" />
            <p className='p'>{t("heading")}</p>
            <p className='subp'>{t("subheading")}</p>
          </Link>
          </div>

          <div className="image-with-text">
            <Link to="/privacy">
            <img src={imagemPoliticaPrivacidade} alt="Política de Privacidade" className="privacy-image" />
            <p className='p'>{t("privacypolicy")}</p>
            <p className='subp'>{t("informationcollection")}</p>
           </Link>
          </div>

          <div className="image-with-text">
            <img src={imagemRegrasComunidade} alt="Regras da Comunidade" className="community-image" />
            <p className='p'>{t("communityrules")}</p>
            <p className='subp'>{t("rulesandinstructions")}</p>
          </div>
        </div>
      </div>
  );
}

export default Terms;

