import jwt
from django.http import JsonResponse
from functools import wraps
from django.conf import settings

def login_required(f):
    @wraps(f)
    def decorated_function(request, *args, **kwargs):
        auth_header = request.headers.get("Authorization")
        if auth_header is None:
            return JsonResponse({"message": "Token is missing!"}, status=403)

        try:
            token = auth_header.split(" ")[1]  # Usually, "Bearer <token>"
            decoded_token = jwt.decode(token, "secret", algorithms="HS256")
            request.username = decoded_token.get("username")  # Assuming user_id is stored in token
            return f(request, *args, **kwargs)
        except jwt.ExpiredSignatureError:
            return JsonResponse({"message": "Token has expired!"}, status=401)
        except jwt.InvalidTokenError:
            return JsonResponse({"message": "Invalid token!"}, status=403)

    return decorated_function