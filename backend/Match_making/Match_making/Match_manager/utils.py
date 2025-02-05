import requests
from typing import Dict, Optional
from requests.exceptions import RequestException
import logging

class ApiManager:
    @staticmethod
    def get(url: str, params: Optional[Dict] = None, auth: Optional[Dict] = None, headers: Optional[Dict] = None) -> Dict:
        try:
            params = params or {}
            headers = headers or {}
            
            if (auth):
                headers['Authorization'] = f'bearer {auth}'
            
            response = requests.get(url, params=params, headers=headers)
            
            response.raise_for_status()
            
            return response.json()
            
        except RequestException as e:
            logging.error(f"Request failed: {str(e)}")
            raise
            
        except ValueError as e:
            logging.error(f"Failed to parse JSON response: {str(e)}")
            raise
        