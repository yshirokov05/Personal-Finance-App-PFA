from firebase_admin import auth
from flask import request, jsonify
from functools import wraps

def token_required(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        id_token = None
        if 'Authorization' in request.headers:
            id_token = request.headers['Authorization'].split('Bearer ')[1]
        
        if not id_token:
            return jsonify({'message': 'Token is missing!'}), 401
        
        try:
            # Verify the ID token
            decoded_token = auth.verify_id_token(id_token)
            request.uid = decoded_token['uid']
        except Exception as e:
            return jsonify({'message': 'Token is invalid!', 'error': str(e)}), 401
        
        return f(*args, **kwargs)
    
    return decorated
