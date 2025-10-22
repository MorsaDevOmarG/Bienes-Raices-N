import Propiedad from "./Propiedad.js";
import Precio from "./Precio.js";
import Categoria from "./Categoria.js";
import Usuario from "./Usuario.js";
import Mensaje from "./Mensaje.js";

// Relaciones, una Propiedad pertene a un Precio
// Precio.hasOne(Propiedad);

// Otra forma, también podemos personalizar la llave foránea, sino personalizamos, sequelize la crea automáticamente
Propiedad.belongsTo(Precio, { foreignKey: "precioId" });

// Una Propiedad pertenece a una Categoría
Propiedad.belongsTo(Categoria, { foreignKey: "categoriaId" });

// Una Propiedad pertenece a un Usuario
Propiedad.belongsTo(Usuario, { foreignKey: "usuarioId" });

Mensaje.belongsTo(Propiedad, { foreignKey: "propiedadId" });
Mensaje.belongsTo(Usuario, { foreignKey: "usuarioId" });

export { Propiedad, Precio, Categoria, Usuario, Mensaje };
