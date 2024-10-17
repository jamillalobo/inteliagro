import { Injectable } from "@nestjs/common";
import axios from "axios";

@Injectable()
export class CepRepository {
    public async getCep(cep: string): Promise<string> {
        try {
          const url = `https://viacep.com.br/ws/${cep}/json/`;
    
          const response = await axios.get(url)

          const data = response.data;
          
          if (data && data.logradouro) {
            return data.logradouro;
          } else {
            console.log('Logradouro não encontrado para o CEP fornecido.');
            return 'Logradouro não encontrado';
          }
        } catch (error) {
          console.log('Erro ao buscar dados do CEP:', error);
          return 'Erro ao buscar dados';
        }
      }
}