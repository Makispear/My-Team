INSERT INTO departments (name)
VALUES
('Sales'),
('Engineering'),
('Finance'),
('Legal');

INSERT INTO roles (title, salary, department_id)
VALUES
('Manager', NULL, Null),
('sales Lead', 100000, 1),
('Salesperson', 80000, 1),
('Lead Engineer', 150000, 2),
('Software Engineer', 120000, 2),
('Accountant', 125000, 3),
('Legal Team Lead', 250000, 4),
('Lawyer', 190000, 4);

INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES
('JJ', 'MM', 1, NULL),
('MM', 'CCC', 2, 1),
('AA', 'RR', 3, NULL),
('KK', 'TT', 4, 3),
('KK', 'SS', 5, NULL),
('MM', 'BB', 6, 5),
('SS', 'LL', 7, NULL),
('TT', 'AA', 8, 7);