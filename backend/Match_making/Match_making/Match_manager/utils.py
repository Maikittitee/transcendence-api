import requests
from typing import Dict, Optional
from requests.exceptions import RequestException
import logging

class ApiManager:
    @staticmethod
    def get(url: str, params: Optional[Dict] = None, authorize: Optional[Dict] = None, headers: Optional[Dict] = None) -> Dict:
        try:
            params = params or {}
            headers = headers or {}
            
            if (authorize):
                headers['Authorization'] = f'Bearer {authorize}'
            
            response = requests.get(url, params=params, headers=headers)
            
            response.raise_for_status()
            
            return response.json()
            
        except RequestException as e:
            logging.error(f"Request failed: {str(e)}")
            raise
            
        except ValueError as e:
            logging.error(f"Failed to parse JSON response: {str(e)}")
            raise
        
# print(ApiManager.get('http://127.0.0.1:9000/auth/users/me/', auth="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzM4OTI2NjQxLCJpYXQiOjE3Mzg4NDAyNDEsImp0aSI6IjZmZjM3MjQwNzhiMDQ3N2FiYzg1NTFkNGMyMDQ3YWE1IiwidXNlcl9pZCI6Mn0.d1oEul33XXZrhvnXFOCc76PE0QzZnHYCoYpnYuPoam4"))