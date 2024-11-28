CREATE TABLE IF NOT EXISTS route
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
COMMENT ON TABLE route IS 'Перелеты';
COMMENT ON COLUMN route.route_id IS 'Идентификатор';
COMMENT ON COLUMN route.airport_departure IS 'Идентификатор аэропорта вылета';
COMMENT ON COLUMN route.airport_arrival IS 'Идентификатор аэропорта прилета';
COMMENT ON COLUMN route.weight_load IS 'Вес загрузки';
COMMENT ON COLUMN route.weight_offload IS 'Всем выгрузки';
COMMENT ON COLUMN route.scheduled_departure_date IS 'Плановая дата вылета';
COMMENT ON COLUMN route.scheduled_arrival_date IS 'Плановая дата прилета';
COMMENT ON COLUMN route.actual_departure_date IS 'Фактическая дата вылета';
COMMENT ON COLUMN route.actual_arrival_date IS 'Фактическая дата прилета';
COMMENT ON COLUMN route.route_type_id IS 'Тип перелета';
COMMENT ON COLUMN route.flight_number IS 'Номер рейса';
COMMENT ON COLUMN route.aircraft_id IS 'Идентификатор самолета';
COMMENT ON COLUMN route.flight_id IS 'Идентификатор рейса';
COMMENT ON COLUMN route.fuel_uplift IS 'Заправка топлива';

CREATE TABLE IF NOT EXISTS aircraft
(
    aircraft_id SERIAL NOT NULL CONSTRAINT aircraft_pk PRIMARY KEY,
    aircraft_name VARCHAR(10),
    aircraft_type_id INT2 NOT NULL,
    tail VARCHAR(10) NOT NULL
);
COMMENT ON TABLE aircraft IS 'Борта';
COMMENT ON COLUMN aircraft.aircraft_id IS 'Идентификатор борта';
COMMENT ON COLUMN aircraft.aircraft_name IS 'Название';
COMMENT ON COLUMN aircraft.aircraft_type_id IS 'Тип борта';
COMMENT ON COLUMN aircraft.tail IS 'Номер борта';
ALTER TABLE route
    ADD CONSTRAINT route_aircraft_fk
        FOREIGN KEY (aircraft_id) REFERENCES aircraft(aircraft_id);

CREATE TABLE IF NOT EXISTS dict_route_type
(
    route_type_id INT4 NOT NULL CONSTRAINT dict_route_type_pk PRIMARY KEY,
    name VARCHAR(100)
);
COMMENT ON TABLE dict_route_type IS 'Тип перелета';
COMMENT ON COLUMN dict_route_type.route_type_id IS 'Идентификатор типа перелета';
COMMENT ON COLUMN dict_route_type.name IS 'Наименование';
ALTER TABLE route
    ADD CONSTRAINT route_type_fk
        FOREIGN KEY (route_type_id) REFERENCES dict_route_type(route_type_id);

CREATE TABLE IF NOT EXISTS contract
(
    contract_id SERIAL4 NOT NULL CONSTRAINT contract_pk PRIMARY KEY
);
COMMENT ON TABLE contract IS 'Контракты';
COMMENT ON COLUMN contract.contract_id IS 'Идентификатор контракта';

CREATE TABLE IF NOT EXISTS flight
(
    flight_id SERIAL4 NOT NULL CONSTRAINT flight_pk PRIMARY KEY,
    contract_id INT4
);
COMMENT ON TABLE flight IS 'Рейсы';
COMMENT ON COLUMN flight.flight_id IS 'Идентификатор рейса';
COMMENT ON COLUMN flight.contract_id IS 'Идентификатор контакта';
ALTER TABLE route
    ADD CONSTRAINT route_flight_fk
        FOREIGN KEY (flight_id) REFERENCES flight(flight_id);
ALTER TABLE flight ADD CONSTRAINT flight_contract_id_unique UNIQUE (contract_id);
-- ALTER TABLE flight
--     ADD CONSTRAINT flight_contract_fk
--         FOREIGN KEY (contract_id) REFERENCES flight(contract_id);

CREATE TABLE airport
(
    airport_id INT4 NOT NULL CONSTRAINT airport_pk PRIMARY KEY,
    iata VARCHAR(3),
    icao VARCHAR(4),
    airport_name VARCHAR(250)
);
COMMENT ON TABLE airport IS 'Рейсы';
COMMENT ON COLUMN airport.airport_id IS 'Идентификатор аэропорта';
COMMENT ON COLUMN airport.iata IS 'IATA';
COMMENT ON COLUMN airport.icao IS 'ИКАО';
COMMENT ON COLUMN airport.airport_name IS 'Название аэропорта';
ALTER TABLE route
    ADD CONSTRAINT route_airport_dept_fk
        FOREIGN KEY (airport_departure) REFERENCES airport(airport_id);
ALTER TABLE route
    ADD CONSTRAINT route_airport_arr_fk
        FOREIGN KEY (airport_arrival) REFERENCES airport(airport_id);
