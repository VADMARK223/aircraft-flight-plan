INSERT INTO contract (name)
VALUES ('Контракт Москвы');
INSERT INTO contract (name)
VALUES ('Контракт Лондона');

INSERT INTO flight (contract_id)
VALUES (1); -- Московский контракт
INSERT INTO flight (contract_id)
VALUES (2); -- Лондонский контракт

INSERT INTO aircraft (aircraft_name, aircraft_type_id, tail)
VALUES ('Boeing', 3, 'RA-12345');
INSERT INTO aircraft (aircraft_name, aircraft_type_id, tail)
VALUES ('Airbus', 4, 'JA123A');

INSERT INTO airport
VALUES (1, 'VKO', 'UUWW ', 'Внуково');
INSERT INTO airport
VALUES (2, 'SVO', 'UUEE ', 'Шереметьево');
INSERT INTO airport
VALUES (3, 'FRU', 'UCFM ', 'Манас');
INSERT INTO airport
VALUES (4, 'KRV', 'UCFP ', 'Каракол');

INSERT INTO route (airport_departure, airport_arrival, weight_load, weight_offload,
                   scheduled_departure_date, scheduled_arrival_date, actual_departure_date,
                   actual_arrival_date, route_type_id, flight_number, aircraft_id, flight_id,
                   fuel_uplift)
VALUES (1, 2, 3, 4, DATE_TRUNC('day', NOW()), DATE_TRUNC('day', NOW()) + INTERVAL '3 hours', NOW(), NOW(), 1, 'FN', 1, 1, 5);

INSERT INTO route (airport_departure, airport_arrival, weight_load, weight_offload,
                   scheduled_departure_date, scheduled_arrival_date, actual_departure_date,
                   actual_arrival_date, route_type_id, flight_number, aircraft_id, flight_id,
                   fuel_uplift)
VALUES (1, 2, 3, 4, NOW(), NOW() + INTERVAL '3 hours', NOW(), NOW(), 1, 'FN', 1, 2, 5);

-- DO
-- $$
--     DECLARE
--         i             INTEGER;
--         random_number INTEGER;
--     BEGIN
--         FOR i IN 1..10
--             LOOP
--                 random_number := TRUNC(RANDOM() * 1000) + 1;
--                 INSERT INTO route (airport_departure, airport_arrival, weight_load, weight_offload,
--                                               scheduled_departure_date, scheduled_arrival_date, actual_departure_date,
--                                               actual_arrival_date, route_type_id, flight_number, aircraft_id, flight_id,
--                                               fuel_uplift)
--                 VALUES (CASE
--                             WHEN RANDOM() > 0.5 THEN 1
--                             ELSE 2
--                             END,
--                         CASE
--                             WHEN RANDOM() > 0.5 THEN 1
--                             ELSE 2
--                             END,
--                         random_number, 5, NOW(), NOW(), NOW(), NOW(), 1, 'FN', 1, 1, 5);
--             END LOOP;
--     END
-- $$;

INSERT INTO runway
VALUES (1, 'ВВП Внуково 1', 1);
INSERT INTO runway
VALUES (2, 'ВВП Внуково 2', 1);
INSERT INTO runway
VALUES (3, 'ВВП Шереметьево 1', 2);
INSERT INTO runway
VALUES (4, 'ВВП Шереметьево 2', 2);
