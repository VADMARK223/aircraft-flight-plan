CREATE OR REPLACE VIEW v_route AS
SELECT r.id,
       r.scheduled_departure_date,
       r.scheduled_arrival_date,
       r.actual_departure_date,
       r.actual_arrival_date,
       r.weight_load,
       r.weight_offload,
       r.route_type_id,
       f.flight_id,
       drt.name,
       ac.aircraft_id,
       ac.tail,
       apt_dept.airport_id   AS apt_dept_id,
       apt_dept.icao         AS apt_dept_icao,
       apt_dept.iata         AS apt_dept_iata,
       apt_dept.airport_name AS apt_dept_name,
       apt_arr.airport_id    AS apt_arr_id,
       apt_arr.icao          AS apt_arr_icao,
       apt_arr.iata          AS apt_arr_iata,
       apt_arr.airport_name  AS apt_arr_name
FROM route r
         JOIN flight f ON r.flight_id = f.flight_id
         LEFT JOIN aircraft ac ON r.aircraft_id = ac.aircraft_id
         JOIN airport apt_dept ON r.airport_departure = apt_dept.airport_id
         JOIN airport apt_arr ON r.airport_arrival = apt_arr.airport_id
         JOIN dict_route_type drt ON r.route_type_id = drt.route_type_id;

COMMENT ON VIEW v_route IS 'Представление перелетов';
COMMENT ON COLUMN v_route.scheduled_departure_date IS 'Плановая дата вылета';
COMMENT ON COLUMN v_route.scheduled_arrival_date IS 'Плановая дата прилета';
COMMENT ON COLUMN v_route.actual_departure_date IS 'Фактическая дата вылета';
COMMENT ON COLUMN v_route.actual_arrival_date IS 'Фактическая дата прилета';
COMMENT ON COLUMN v_route.route_type_id IS 'Тип перелета';
COMMENT ON COLUMN v_route.tail IS 'Номер борта';
COMMENT ON COLUMN v_route.apt_dept_id IS 'Идентификатор аэропорта вылета';
COMMENT ON COLUMN v_route.apt_arr_id IS 'Идентификатор аэропорта прилета';
