-- This is an empty migration.
INSERT INTO "Facility" ("name", "zip_code", "type_of_care", "capacity", "serves_from", "serves_to")
VALUES ('A', 12000, 'Stationary', 'Full', 10000, 14999);

INSERT INTO "Facility" ("name", "zip_code", "type_of_care", "capacity", "serves_from", "serves_to")
VALUES ('B', 17000, 'Stationary', 'Available', 15000, 19999);

INSERT INTO "Facility" ("name", "zip_code", "type_of_care", "capacity", "serves_from", "serves_to")
VALUES ('C', 22000, 'Ambulatory', 'Full', 20000, 24999);

INSERT INTO "Facility" ("name", "zip_code", "type_of_care", "capacity", "serves_from", "serves_to")
VALUES ('D', 27000, 'Ambulatory', 'Available', 25000, 29999);

INSERT INTO "Facility" ("name", "zip_code", "type_of_care", "capacity", "serves_from", "serves_to")
VALUES ('E', 18000, 'Both', 'Available', 10000, 24999);
