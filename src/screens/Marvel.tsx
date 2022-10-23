import React from 'react';
import { HeroesProvidedComponent } from '../proxy/ProxyProvider';

export default function Marvel() {

  return ( 
    <>
      {HeroesProvidedComponent({url: '/v1/public/characters'})}
    </>
  )
}

