from django.http import JsonResponse
from django.utils.deprecation import MiddlewareMixin

class CustomCORSMiddleware(MiddlewareMixin):
    def process_response(self, request, response):
        # You can customize your CORS headers here

        # Allow all origins by default
        response['Access-Control-Allow-Origin'] = '*'

        # Allow specific methods
        response['Access-Control-Allow-Methods'] = 'GET, POST, OPTIONS, PUT, DELETE'

        # Allow specific headers
        response['Access-Control-Allow-Headers'] = 'Content-Type, Authorization, X-Requested-With'

        # Handle OPTIONS requests (preflight requests)
        if request.method == 'OPTIONS':
            response.status_code = 200
            return response

        return response
