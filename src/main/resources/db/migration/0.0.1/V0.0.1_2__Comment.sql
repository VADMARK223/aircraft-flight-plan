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

COMMENT ON TABLE afp_schema.dict_aircraft_type IS 'Словарь типов бортов';
COMMENT ON COLUMN afp_schema.dict_aircraft_type.aircraft_type_id IS 'Идентификатор типа борта';
COMMENT ON COLUMN afp_schema.dict_aircraft_type.aircraft_type_name IS 'Наименование типа борта';

COMMENT ON TABLE aircraft IS 'Борта';
COMMENT ON COLUMN aircraft.aircraft_id IS 'Идентификатор борта';
COMMENT ON COLUMN aircraft.aircraft_name IS 'Название';
COMMENT ON COLUMN aircraft.aircraft_type_id IS 'Тип борта';
COMMENT ON COLUMN aircraft.tail IS 'Номер борта';

COMMENT ON TABLE dict_route_type IS 'Тип перелета';
COMMENT ON COLUMN dict_route_type.route_type_id IS 'Идентификатор типа перелета';
COMMENT ON COLUMN dict_route_type.name IS 'Наименование';

COMMENT ON TABLE contract IS 'Контракты';
COMMENT ON COLUMN contract.contract_id IS 'Идентификатор контракта';

COMMENT ON TABLE flight IS 'Рейсы';
COMMENT ON COLUMN flight.flight_id IS 'Идентификатор рейса';
COMMENT ON COLUMN flight.contract_id IS 'Идентификатор контакта';

COMMENT ON TABLE airport IS 'Рейсы';
COMMENT ON COLUMN airport.airport_id IS 'Идентификатор аэропорта';
COMMENT ON COLUMN airport.iata IS 'IATA';
COMMENT ON COLUMN airport.icao IS 'ИКАО';
COMMENT ON COLUMN airport.airport_name IS 'Название аэропорта';
