ALTER TABLE route
    ADD CONSTRAINT route_aircraft_fk
        FOREIGN KEY (aircraft_id) REFERENCES aircraft(aircraft_id);
ALTER TABLE route
    ADD CONSTRAINT route_airport_dept_fk
        FOREIGN KEY (airport_departure) REFERENCES airport(airport_id);
ALTER TABLE route
    ADD CONSTRAINT route_airport_arr_fk
        FOREIGN KEY (airport_arrival) REFERENCES airport(airport_id);
ALTER TABLE route
    ADD CONSTRAINT route_type_fk
        FOREIGN KEY (route_type_id) REFERENCES dict_route_type(route_type_id);
ALTER TABLE route
    ADD CONSTRAINT route_flight_fk
        FOREIGN KEY (flight_id) REFERENCES flight(flight_id) ON DELETE CASCADE;

ALTER TABLE aircraft
    ADD CONSTRAINT aircraft_aircraft_type_fk
        FOREIGN KEY (aircraft_type_id) REFERENCES dict_aircraft_type(aircraft_type_id);

ALTER TABLE flight
    ADD CONSTRAINT flight_contract_fk
        FOREIGN KEY (contract_id) REFERENCES contract(contract_id);

ALTER TABLE afp_schema.runway
    ADD CONSTRAINT runway_airport__fk
        FOREIGN KEY (airport_id) REFERENCES afp_schema.airport(airport_id);
