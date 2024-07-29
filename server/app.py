from flask import Flask 
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # This will enable CORS for all routes

# https://stackoverflow.com/questions/31252791/flask-importerror-no-module-named-flask

@app.route('/')
def home():
    print('running')
    return "Hello, Flask!"
if __name__ == '__main__':
    app.run(debug=True)