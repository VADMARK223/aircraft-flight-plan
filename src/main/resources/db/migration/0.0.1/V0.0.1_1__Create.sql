CREATE TABLE IF NOT EXISTS route
(
    id SERIAL NOT NULL CONSTRAINT route_pk PRIMARY KEY,
    airport_departure INT4 NOT NULL,
    airport_arrival INT4 NOT NULL,
    weight_load INT4,
    weight_offload INT4,
    scheduled_departure_date TIMESTAMP NOT NULL,
    scheduled_arrival_date TIMESTAMP NOT NULL,
    actual_departure_date TIMESTAMP,
    actual_arrival_date TIMESTAMP,
    route_type_id INT2 NOT NULL,
    flight_number VARCHAR(10),
    aircraft_id INT4,
    flight_id INT4,
    fuel_uplift INT4
);

CREATE TABLE IF NOT EXISTS dict_aircraft_type
(
    aircraft_type_id INT2 NOT NULL UNIQUE,
    aircraft_type_name VARCHAR(10)
);

CREATE TABLE IF NOT EXISTS aircraft
(
    aircraft_id SERIAL NOT NULL CONSTRAINT aircraft_pk PRIMARY KEY,
    aircraft_name VARCHAR(10),
    aircraft_type_id INT2 NOT NULL,
    tail VARCHAR(10) NOT NULL
);

CREATE TABLE IF NOT EXISTS dict_route_type
(
    route_type_id INT4 NOT NULL CONSTRAINT dict_route_type_pk PRIMARY KEY,
    name VARCHAR(100)
);

CREATE TABLE IF NOT EXISTS contract
(
    contract_id SERIAL4 NOT NULL CONSTRAINT contract_pk PRIMARY KEY
);

CREATE TABLE IF NOT EXISTS flight
(
    flight_id SERIAL4 NOT NULL CONSTRAINT flight_pk PRIMARY KEY,
    contract_id INT4
);

CREATE TABLE IF NOT EXISTS airport
(
    airport_id INT4 NOT NULL CONSTRAINT airport_pk PRIMARY KEY,
    iata VARCHAR(3),
    icao VARCHAR(4),
    airport_name VARCHAR(250)
);

CREATE TABLE IF NOT EXISTS runway
(
    runway_id INT8 NOT NULL UNIQUE,
    runway_name VARCHAR(100) NOT NULL,
    airport_id INT4 NOT NULL
);
