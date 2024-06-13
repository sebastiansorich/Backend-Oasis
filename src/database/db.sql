CREATE DATABASE Inventario_Oasis;

CREATE TABLE Productos (
    id_Producto serial PRIMARY KEY,
    nombre varchar(100) NOT NULL,
    precio DECIMAL NOT NULL,
    stock_minimo DECIMAL NOT NULL,
    stock_actual DECIMAL NOT NULL,
    id_proveedor INT REFERENCES Proveedores(codigo)
);

CREATE TABLE Clientes (
    id_cliente SERIAL UNIQUE PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    direccion VARCHAR(255) NOT NULL,
    telefono VARCHAR(20) NOT NULL
);

CREATE TABLE Cargos (
    id_cargo SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    descripcion TEXT NOT NULL
);

CREATE TABLE Trabajadores (
    id_trabajador SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    telefono VARCHAR(20) NOT NULL,
    direccion VARCHAR(255) NOT NULL,
    id_cargo INT NOT NULL,
    FOREIGN KEY (id_cargo) REFERENCES Cargos(id_cargo)
);
-- Consultar todos los trabajadores con sus cargos
SELECT t.nombre AS nombre_trabajador, t.telefono, t.direccion, c.nombre AS nombre_cargo, c.descripcion AS descripcion_cargo
FROM Trabajadores t
JOIN Cargos c ON t.id_cargo = c.id_cargo;

CREATE TABLE Proveedores (
    codigo SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    telefono VARCHAR(20) NOT NULL,
    pais VARCHAR(50) NOT NULL
);

CREATE TABLE Catalogo (
    codigo SERIAL PRIMARY KEY,
    codigo_proveedor INTEGER NOT NULL,
    nombre VARCHAR(100) NOT NULL,
    descripcion TEXT,
    FOREIGN KEY (codigo_proveedor) REFERENCES Proveedores(codigo) ON DELETE CASCADE
);

CREATE TABLE NotasEntrega (
    id_nota_entrega SERIAL PRIMARY KEY,
    id_trabajador INT NOT NULL,
    id_cliente INT NOT NULL,
    fecha DATE DEFAULT CURRENT_DATE,
    total DECIMAL NOT NULL,
    FOREIGN KEY (id_trabajador) REFERENCES Trabajadores(id_trabajador),
    FOREIGN KEY (id_cliente) REFERENCES Clientes(id_cliente)
);

CREATE TABLE DetallesNotasEntrega (
    id_detalle SERIAL PRIMARY KEY,
    id_nota_entrega INT NOT NULL,
    id_producto INT NOT NULL,
    cantidad INT NOT NULL,
    precio_venta DECIMAL NOT NULL,
    FOREIGN KEY (id_nota_entrega) REFERENCES NotasEntrega(id_nota_entrega),
    FOREIGN KEY (id_producto) REFERENCES Productos(id_producto)
);
CREATE TABLE NIT (

    nit VARCHAR(20) UNIQUE PRIMARY KEY NOT NULL,
    nombre_cliente VARCHAR(100) NOT NULL
);
CREATE TABLE Pagos (
    id_pago SERIAL PRIMARY KEY,
    codigo_nota_entrega INT NOT NULL,
    monto_pagado DECIMAL NOT NULL,
    fecha_pago DATE DEFAULT CURRENT_DATE,
    CONSTRAINT fk_codigo_nota_entrega FOREIGN KEY (codigo_nota_entrega) REFERENCES NotasEntrega(id_nota_entrega)
);
CREATE TABLE FacturasVenta (
    id_factura SERIAL PRIMARY KEY,
    codigo_factura VARCHAR(20) UNIQUE NOT NULL,
    id_nota_entrega INT NOT NULL,
    nit_cliente VARCHAR(20) NOT NULL,
    id_trabajador INT NOT NULL,
    fecha DATE DEFAULT CURRENT_DATE,
    total DECIMAL NOT NULL,
    FOREIGN KEY (id_nota_entrega) REFERENCES NotasEntrega(id_nota_entrega),
    FOREIGN KEY (nit_cliente) REFERENCES NIT(nit),
    FOREIGN KEY (id_trabajador) REFERENCES Trabajadores(id_trabajador)
);
CREATE TABLE NotasPedido (
    id_nota_pedido SERIAL PRIMARY KEY,
    codigo_pedido VARCHAR(50) UNIQUE NOT NULL,
    id_trabajador INT NOT NULL,
    fecha DATE DEFAULT CURRENT_DATE,
    FOREIGN KEY (id_trabajador) REFERENCES Trabajadores(id_trabajador)
);

CREATE TABLE DetallesNotaPedido (
    id_detalle SERIAL PRIMARY KEY,
    id_nota_pedido INT NOT NULL,
    id_producto INT NOT NULL,
    cantidad INT NOT NULL,
    FOREIGN KEY (id_nota_pedido) REFERENCES NotasPedido(id_nota_pedido),
    FOREIGN KEY (id_producto) REFERENCES Productos(id_producto)
);  