CREATE TABLE afp_schema.route
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
