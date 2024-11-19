// Importando os módulos de Query e Mutation com a sintaxe de importação ESM
import Query from '../model/Types/index.js';        // Importa index.js dentro de Types/
import Mutation from '../model/Mutations/index.js'; // Importa index.js dentro de Mutations/

// Exportando os objetos Query e Mutation como um único objeto ESM
export default {
    Query,
    Mutation
};