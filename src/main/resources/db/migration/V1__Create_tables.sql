CREATE SCHEMA IF NOT EXISTS afp_schema;

CREATE TABLE IF NOT EXISTS afp_schema.route
(
    route_id SERIAL NOT NULL CONSTRAINT route_pk PRIMARY KEY,
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
COMMENT ON TABLE afp_schema.route IS 'Перелеты';
COMMENT ON COLUMN afp_schema.route.route_id IS 'Идентификатор';
COMMENT ON COLUMN afp_schema.route.airport_departure IS 'Идентификатор аэропорта вылета';
COMMENT ON COLUMN afp_schema.route.airport_arrival IS 'Идентификатор аэропорта прилета';
COMMENT ON COLUMN afp_schema.route.weight_load IS 'Вес загрузки';
COMMENT ON COLUMN afp_schema.route.weight_offload IS 'Всем выгрузки';
COMMENT ON COLUMN afp_schema.route.scheduled_departure_date IS 'Плановая дата вылета';
COMMENT ON COLUMN afp_schema.route.scheduled_arrival_date IS 'Плановая дата прилета';
COMMENT ON COLUMN afp_schema.route.actual_departure_date IS 'Фактическая дата вылета';
COMMENT ON COLUMN afp_schema.route.actual_arrival_date IS 'Фактическая дата прилета';
COMMENT ON COLUMN afp_schema.route.route_type_id IS 'Тип перелета';
COMMENT ON COLUMN afp_schema.route.flight_number IS 'Номер рейса';
COMMENT ON COLUMN afp_schema.route.aircraft_id IS 'Идентификатор самолета';
COMMENT ON COLUMN afp_schema.route.flight_id IS 'Идентификатор рейса';
COMMENT ON COLUMN afp_schema.route.fuel_uplift IS 'Заправка топлива';

CREATE TABLE IF NOT EXISTS afp_schema.aircraft
(
    aircraft_id SERIAL NOT NULL CONSTRAINT aircraft_pk PRIMARY KEY,
    aircraft_name VARCHAR(10),
    aircraft_type_id INT2 NOT NULL,
    tail VARCHAR(10) NOT NULL
);
COMMENT ON TABLE afp_schema.aircraft IS 'Борта';
COMMENT ON COLUMN afp_schema.aircraft.aircraft_id IS 'Идентификатор борта';
COMMENT ON COLUMN afp_schema.aircraft.aircraft_name IS 'Название';
COMMENT ON COLUMN afp_schema.aircraft.aircraft_type_id IS 'Тип борта';
COMMENT ON COLUMN afp_schema.aircraft.tail IS 'Номер борта';
ALTER TABLE afp_schema.route
    ADD CONSTRAINT route_aircraft_fk
        FOREIGN KEY (aircraft_id) REFERENCES afp_schema.aircraft(aircraft_id);

CREATE TABLE IF NOT EXISTS afp_schema.dict_route_type
(
    route_type_id INT4 NOT NULL CONSTRAINT dict_route_type_pk PRIMARY KEY,
    name VARCHAR(100)
);
COMMENT ON TABLE afp_schema.dict_route_type IS 'Тип перелета';
COMMENT ON COLUMN afp_schema.dict_route_type.route_type_id IS 'Идентификатор типа перелета';
COMMENT ON COLUMN afp_schema.dict_route_type.name IS 'Наименование';
ALTER TABLE afp_schema.route
    ADD CONSTRAINT route_type_fk
        FOREIGN KEY (route_type_id) REFERENCES afp_schema.dict_route_type(route_type_id);

CREATE TABLE IF NOT EXISTS afp_schema.flight
(
    flight_id SERIAL4 NOT NULL CONSTRAINT flight_pk PRIMARY KEY,
    contact_id INT4
);
COMMENT ON TABLE afp_schema.flight IS 'Рейсы';
COMMENT ON COLUMN afp_schema.flight.flight_id IS 'Идентификатор рейса';
COMMENT ON COLUMN afp_schema.flight.contact_id IS 'Идентификатор контакта';
ALTER TABLE afp_schema.route
    ADD CONSTRAINT route_flight_fk
        FOREIGN KEY (flight_id) REFERENCES afp_schema.flight(flight_id);

CREATE TABLE afp_schema.airport
(
    airport_id INT4 NOT NULL CONSTRAINT airport_pk PRIMARY KEY,
    iata VARCHAR(3),
    icao VARCHAR(4),
    airport_name VARCHAR(250)
);
COMMENT ON TABLE afp_schema.airport IS 'Рейсы';
COMMENT ON COLUMN afp_schema.airport.airport_id IS 'Идентификатор аэропорта';
COMMENT ON COLUMN afp_schema.airport.iata IS 'IATA';
COMMENT ON COLUMN afp_schema.airport.icao IS 'ИКАО';
COMMENT ON COLUMN afp_schema.airport.airport_name IS 'Название аэропорта';
ALTER TABLE afp_schema.route
    ADD CONSTRAINT route_airport_dept_fk
        FOREIGN KEY (airport_departure) REFERENCES afp_schema.airport(airport_id);
ALTER TABLE afp_schema.route
    ADD CONSTRAINT route_airport_arr_fk
        FOREIGN KEY (airport_arrival) REFERENCES afp_schema.airport(airport_id);
