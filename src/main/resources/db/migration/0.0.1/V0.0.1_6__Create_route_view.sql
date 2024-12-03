CREATE OR REPLACE VIEW afp_schema.v_route AS
SELECT r.route_id,
       r.scheduled_departure_date,
       r.scheduled_arrival_date,
       r.actual_departure_date,
       r.actual_arrival_date,
       r.weight_load,
       r.weight_offload,
       r.route_type_id,
       drt.name,
       ac.aircraft_id,
       ac.tail,
       apt_dept.icao         AS apt_dept_icao,
       apt_dept.iata         AS apt_dept_iata,
       apt_dept.airport_name AS apt_dept_name,
       apt_arr.icao          AS apt_arr_icao,
       apt_arr.iata          AS apt_arr_iata,
       apt_arr.airport_name  AS apt_arr_name,
       f.flight_id
FROM afp_schema.route r
         JOIN afp_schema.aircraft ac ON r.aircraft_id = ac.aircraft_id
         JOIN afp_schema.airport apt_dept ON r.airport_departure = apt_dept.airport_id
         JOIN afp_schema.airport apt_arr ON r.airport_arrival = apt_arr.airport_id
         JOIN afp_schema.dict_route_type drt ON r.route_type_id = drt.route_type_id
         JOIN afp_schema.flight f ON r.flight_id = f.flight_id;

COMMENT ON VIEW afp_schema.v_route IS 'Представление перелетов';
COMMENT ON COLUMN afp_schema.v_route.scheduled_departure_date IS 'Плановая дата вылета';
COMMENT ON COLUMN afp_schema.v_route.scheduled_arrival_date IS 'Плановая дата прилета';
COMMENT ON COLUMN afp_schema.v_route.actual_departure_date IS 'Фактическая дата вылета';
COMMENT ON COLUMN afp_schema.v_route.actual_arrival_date IS 'Фактическая дата прилета';
COMMENT ON COLUMN afp_schema.v_route.route_type_id IS 'Тип перелета';
