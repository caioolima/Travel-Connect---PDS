// Header.js
import React from 'react';
import '../Header/header.css'; // Supondo que seus estilos estejam em um arquivo chamado Header.css
import '../css/main.css';
import '../css/resets.css'

import { useTranslation } from 'react-i18next';  // Importa useTranslation do react-i18next
import i18n from '../Language/i18n';

function Header() {
  const { t } = useTranslation();
  return (
    <header className="face-infos">
      <div className="container">
        <h1>{t('app_title')}</h1>
        <p>{t('connect_travelers')}</p>
        <p>{t('share_experiences')}</p>
      </div>
    </header>
  );
}

export default Header;
