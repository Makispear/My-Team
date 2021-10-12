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
('JJ', 'MM', 1, 1),
('MM', 'CCC', 2, 1),
('AA', 'RR', 3, 1),
('KK', 'TT', 4, 1),
('KK', 'SS', 5, 1),
('MM', 'BB', 6, 1),
('SS', 'LL', 7, 1),
('TT', 'AA', 8, 1);