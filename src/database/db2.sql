CREATE TABLE Proveedores (
    id_Proveedor SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    telefono VARCHAR(20) NOT NULL,
    pais VARCHAR(50) NOT NULL,
	correo VARCHAR(100) NOT NULL
);

CREATE TABLE Productos (
    id_Producto serial PRIMARY KEY,
    nombre varchar(100) NOT NULL,
    precio DECIMAL NOT NULL,
    stock_minimo INT,
    stock_actual INT,
    id_proveedores INT REFERENCES Proveedores(id_Proveedor)
);