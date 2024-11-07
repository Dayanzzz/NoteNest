# app/task_routes.py

from flask import Blueprint, jsonify
from flask_login import login_required, current_user
from app.models import Task

task_routes = Blueprint('tasks', __name__)


@task_routes.route('/', methods=['GET'])
@login_required
def get_tasks():

  tasks = Task.query.filter_by(user_id = current_user.id).all()
  return jsonify([task.to_dict() for task in tasks])
