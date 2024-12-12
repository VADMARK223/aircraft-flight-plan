INSERT INTO contract (contract_id) VALUES (999);
INSERT INTO contract (contract_id) VALUES (888);
INSERT INTO flight (contract_id) VALUES (999);
INSERT INTO flight (contract_id) VALUES (888);
INSERT INTO aircraft (aircraft_name, aircraft_type_id, tail) VALUES ('Boeng', 3,'tail');
INSERT INTO aircraft (aircraft_name, aircraft_type_id, tail) VALUES ('Airbus', 4,'tail4');

INSERT INTO airport VALUES (1, 'VKO', 'UUWW ', 'Внуково');
INSERT INTO airport VALUES (2, 'SVO', 'UUEE ', 'Шереметьево');

DO
$$
    DECLARE
        i             INTEGER;
        random_number INTEGER;
    BEGIN
        FOR i IN 1..10
            LOOP
                random_number := TRUNC(RANDOM() * 1000) + 1;
                INSERT INTO route (airport_departure, airport_arrival, weight_load, weight_offload,
                                              scheduled_departure_date, scheduled_arrival_date, actual_departure_date,
                                              actual_arrival_date, route_type_id, flight_number, aircraft_id, flight_id,
                                              fuel_uplift)
                VALUES (CASE
                            WHEN RANDOM() > 0.5 THEN 1
                            ELSE 2
                            END,
                        CASE
                            WHEN RANDOM() > 0.5 THEN 1
                            ELSE 2
                            END,
                        random_number, 5, NOW(), NOW(), NOW(), NOW(), 1, 'FN', 1, 1, 5);
            END LOOP;
    END
$$;

INSERT INTO runway VALUES (1, 'ВВП Внуково 1', 1);
INSERT INTO runway VALUES (2, 'ВВП Внуково 2', 1);
INSERT INTO runway VALUES (3, 'ВВП Шереметьево 1', 2);
INSERT INTO runway VALUES (4, 'ВВП Шереметьево 2', 2);
