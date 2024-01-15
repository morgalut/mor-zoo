from flask import Flask, render_template, request, redirect, send_from_directory, session, url_for, jsonify
import json
import os

app = Flask(__name__)

# Load initial data from data.json or create an empty list
if not os.path.exists("data.json"):
    with open("data.json", "w") as f:
        json.dump([], f)

with open("data.json", "r") as f:
    animals_data = json.load(f)

dummy_user = {
    'email': 'user@example.com',
    'password': 'password',
    'name': 'Demo User'
}

@app.route('/static/IMG/<path:filename>')
def serve_static(filename):
    root_dir = os.path.dirname(os.path.abspath(__file__))
    return send_from_directory(os.path.join(root_dir, 'static', 'IMG'), filename)

@app.route('/')
def home():
    if 'user' in session:
        return render_template('home.html', user=session['user'])
    else:
        return redirect(url_for('login'))

@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        email = request.form.get('email')
        password = request.form.get('password')

        if email == dummy_user['email'] and password == dummy_user['password']:
            # Authentication successful, store user in session
            session['user'] = {
                'email': email,
                'name': dummy_user['name']
            }
            return redirect(url_for('home'))
        else:
            return render_template('login.html', message='Invalid email or password')

    return render_template('login.html')

@app.route('/logout')
def logout():
    session.pop('user', None)
    return redirect(url_for('home'))

@app.route('/gallery')
def gallery():
    return render_template('gallery.html')

@app.route('/add', methods=['GET', 'POST'])
def add():
    if request.method == 'POST':
        # Handle form submission
        # Extract data from the form
        name = request.form.get('name')
        animal_type = request.form.get('type')
        age = request.form.get('age')
        species = request.form.get('species')
        image_url = request.form.get('image_url')

        # Create a new animal dictionary
        new_animal = {
            'id': len(animals_data) + 1,
            'name': name,
            'type': animal_type,
            'age': age,
            'species': species,
            'image_url': image_url
        }

        # Append the new animal to the data list
        animals_data.append(new_animal)

        # Save the updated data to data.json
        with open("data.json", "w") as f:
            json.dump(animals_data, f, indent=2)

        return redirect(url_for('read'))

    return render_template('add.html')

@app.route('/read')
def read():
    return render_template('read.html', animals=animals_data)

@app.route('/update/<int:animal_id>', methods=['GET', 'POST'])
def update(animal_id):
    # Find the animal by ID
    animal = next((a for a in animals_data if a['id'] == animal_id), None)

    if animal is None:
        return 'Animal not found', 404

    if request.method == 'POST':
        # Handle form submission for updating an animal
        # Extract data from the form
        animal['name'] = request.form.get('name')
        animal['type'] = request.form.get('type')
        animal['age'] = request.form.get('age')
        animal['species'] = request.form.get('species')
        animal['image_url'] = request.form.get('image_url')

        # Save the updated data to data.json
        with open("data.json", "w") as f:
            json.dump(animals_data, f, indent=2)

        return redirect(url_for('read'))

    return render_template('update.html', animal=animal)



@app.route('/delete/<int:animal_id>', methods=['GET', 'POST'])
def delete(animal_id):
    if request.method == 'POST':
        # Remove the animal by ID
        animals_data[:] = [a for a in animals_data if a['id'] != animal_id]

        # Save the updated data to data.json
        with open("data.json", "w") as f:
            json.dump(animals_data, f, indent=2)

        return redirect(url_for('read'))

    return 'Method Not Allowed', 405


if __name__ == '__main__':
    app.run(debug=True)
