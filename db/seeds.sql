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
('Mike', 'Ternor', 1, 1),
('Aliza', 'Wernor', 2, 1),
('Kim', 'Theiry', 3, 1),
('Chan', 'Rooney', 4, 1),
('jose', 'Juan', 5, 1),
('Heio', 'Chinso', 6, 1),
('Leena', 'Babikir', 7, 1),
('Ahmed', 'Fadlallah', 8, 1);