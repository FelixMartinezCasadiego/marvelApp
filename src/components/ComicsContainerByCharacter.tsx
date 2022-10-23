import {Result} from '../api/typeApi';
import { ComicsProvidedComponent } from '../proxy/ProxyProvider';

interface Props { character: Result};

export default function ComicsContainerByCharacter( {character} : Props) {    
  return (
      <>
        {ComicsProvidedComponent({url: `/v1/public/characters/${character.id}/comics`, character: character})} 
      </>
  )
}
