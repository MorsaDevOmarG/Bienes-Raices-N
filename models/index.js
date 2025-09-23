import Propiedad from './Propiedad.js';
import Categoria from './Categoria.js';
import Precio from './Precio.js';
import Usuario from './Usuario.js';

// Relaciones, una Propiedad pertene a un Precio
// Precio.hasOne(Propiedad);

// Otra forma, también podemos personalizar la llave foránea, sino personalizamos, sequelize la crea automáticamente
Precio.belonsTo(Propiedad, { foreignKey: 'precioId' });




export { Propiedad, Categoria, Precio, Usuario };