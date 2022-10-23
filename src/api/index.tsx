import { create } from "apisauce";
import { Response } from "./typeApi";


export const api = create({
    baseURL: 'https://gateway.marvel.com:443'
  });


export const marvelCharacterById = async (characterId : number) => {
    try {
        const characterById = await api.get<Response>(`/v1/public/characters/${characterId}?apikey=5f9bc130cc1e128aabc6ff2d892dee54&hash=3fdeb8797479a34f742c3e8f6419bbd4&ts=1`);
        const data = characterById.data?.data?.results;
        return data;
    } catch (error) {
        throw error;
    }
}
