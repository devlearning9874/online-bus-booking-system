import csv
import random
from datetime import datetime, timedelta

NUM_BUSES = 50
NUM_ROUTES = 100
NUM_USERS = 100
NUM_BOOKINGS = 5000

bus_types = ['Sleeper', 'Semi-Sleeper', 'AC', 'Non-AC', 'Volvo', 'Mini']
city_pairs = [
    ('Mumbai', 'Pune'), ('Delhi', 'Jaipur'), ('Bangalore', 'Mysore'),
    ('Chennai', 'Hyderabad'), ('Kolkata', 'Darjeeling'), ('Ahmedabad', 'Surat'),
    ('Lucknow', 'Varanasi'), ('Patna', 'Ranchi'), ('Goa', 'Mumbai'),
    ('Gurgaon', 'Noida')
]
status_values = ['CONFIRMED', 'CANCELLED', 'PENDING']


def quote(value):
    return "'" + str(value).replace("'", "''") + "'"


def generate_bus_rows():
    rows = []
    for bus_id in range(1, NUM_BUSES + 1):
        rows.append((bus_id, f'Bus-{bus_id:03}', random.choice(bus_types), random.randint(32, 60)))
    return rows


def generate_route_rows():
    rows = []
    for idx in range(1, NUM_ROUTES + 1):
        source, dest = random.choice(city_pairs)
        while source == dest:
            source, dest = random.choice(city_pairs)
        rows.append((f'R{idx:04}', source, dest, random.randint(20, 60), round(random.uniform(500, 3000), 2)))
    return rows


def generate_user_rows():
    rows = []
    for user_id in range(1, NUM_USERS + 1):
        rows.append((user_id, f'user{user_id}', f'pass{user_id:04}'))
    return rows


def generate_inventory_rows(bus_rows):
    rows = []
    now = datetime.now()
    for bus_id, _, _, total in bus_rows:
        rows.append((f'I{bus_id:04}', bus_id, random.randint(max(0, total - 10), total), (now - timedelta(days=random.randint(0, 5))).strftime('%Y-%m-%d %H:%M:%S')))
    return rows


def generate_booking_rows(bus_rows):
    rows = []
    for idx in range(1, NUM_BOOKINGS + 1):
        booking_id = f'B{idx:05}'
        bus_id = random.choice(bus_rows)[0]
        dt = datetime.now() - timedelta(days=random.randint(0, 90), hours=random.randint(0, 23), minutes=random.randint(0, 59))
        source, destination = random.choice(city_pairs)
        while source == destination:
            source, destination = random.choice(city_pairs)
        rows.append((booking_id, bus_id, dt.strftime('%Y-%m-%d %H:%M:%S'), source, destination, random.randint(1, 5), random.choice(status_values)))
    return rows


def generate_passenger_rows(booking_rows):
    return [(f'P{idx:05}', booking_id) for idx, (booking_id, *_ ) in enumerate(booking_rows, start=1)]


def generate_payment_rows(booking_rows):
    rows = []
    for idx, (booking_id, _, dt, *_ ) in enumerate(booking_rows, start=1):
        pay_dt = datetime.strptime(dt, '%Y-%m-%d %H:%M:%S') + timedelta(hours=random.randint(1, 72))
        rows.append((f'PAY{idx:05}', booking_id, pay_dt.strftime('%Y-%m-%d %H:%M:%S')))
    return rows


def write_insert(filename, table, columns, rows):
    with open(filename, 'w', encoding='utf-8') as f:
        f.write(f'USE onlinebusbooking;\n')
        f.write(f'INSERT INTO {table} ({", ".join(columns)}) VALUES\n')
        for i, row in enumerate(rows):
            values = ', '.join(quote(str(v)) for v in row)
            end = ',' if i < len(rows) - 1 else ';'
            f.write(f'  ({values}){end}\n')


def main():
    bus_rows = generate_bus_rows()
    route_rows = generate_route_rows()
    user_rows = generate_user_rows()
    inventory_rows = generate_inventory_rows(bus_rows)
    booking_rows = generate_booking_rows(bus_rows)
    passenger_rows = generate_passenger_rows(booking_rows)
    payment_rows = generate_payment_rows(booking_rows)

    write_insert('sample-bus.sql', 'bus', ['bus_id', 'bus_name', 'bus_type', 'total_seats'], bus_rows)
    write_insert('sample-route.sql', 'route', ['route_id', 'source', 'destination', 'seats', 'price'], route_rows)
    write_insert('sample-user.sql', '`user`', ['user_id', 'username', 'password'], user_rows)
    write_insert('sample-inventory.sql', 'inventory', ['inventory_id', 'bus_id', 'available_seats', 'last_updated_date'], inventory_rows)
    write_insert('sample-booking.sql', 'booking', ['booking_id', 'bus_id', 'date_of_booking', 'source', 'destination', 'no_of_seats', 'status'], booking_rows)
    write_insert('sample-passanger.sql', 'passanger', ['pas_id', 'booking_id'], passenger_rows)
    write_insert('sample-payment.sql', 'payment', ['pay_id', 'booking_id', 'payment_date'], payment_rows)

    print('Generated sample SQL files:')
    print('  sample-bus.sql')
    print('  sample-route.sql')
    print('  sample-user.sql')
    print('  sample-inventory.sql')
    print('  sample-booking.sql')
    print('  sample-passanger.sql')
    print('  sample-payment.sql')


if __name__ == '__main__':
    main()
