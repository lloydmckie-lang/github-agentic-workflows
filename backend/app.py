import os
from flask import Flask, jsonify, request
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# In-memory store for items
items = [
    {"id": 1, "name": "Item One"},
    {"id": 2, "name": "Item Two"},
]
next_id = 3


@app.route("/api/health", methods=["GET"])
def health():
    """Health check endpoint."""
    return jsonify({"status": "ok"})


@app.route("/api/items", methods=["GET"])
def get_items():
    """Return all items."""
    return jsonify(items)


@app.route("/api/items", methods=["POST"])
def create_item():
    """Create a new item."""
    global next_id
    data = request.get_json()
    if not data or not data.get("name"):
        return jsonify({"error": "name is required"}), 400
    item = {"id": next_id, "name": data["name"]}
    next_id += 1
    items.append(item)
    return jsonify(item), 201


@app.route("/api/items/<int:item_id>", methods=["DELETE"])
def delete_item(item_id):
    """Delete an item by id."""
    global items
    original_len = len(items)
    items = [i for i in items if i["id"] != item_id]
    if len(items) == original_len:
        return jsonify({"error": "item not found"}), 404
    return jsonify({"deleted": item_id})


if __name__ == "__main__":
    debug = os.environ.get("FLASK_DEBUG", "false").lower() == "true"
    app.run(debug=debug, port=5000)
