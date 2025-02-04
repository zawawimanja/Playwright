import requests

# Define the API endpoint
API_URL = 'http://barista-sandbox.perkeso.gov.my:8090/Claim/search'

# Function to perform the API request
def test_claim_search(scheme_ref_no):
    # Prepare the request payload
    payload = {
        'schemeRefNo': scheme_ref_no
    }
    
    # Send POST request
    response = requests.post(API_URL, json=payload)
    
    # Check response status and content
    if response.status_code == 200:
        print("Request successful:", response.json())
    else:
        print(f"Request failed with status code {response.status_code}: {response.text}")

# Example usage with a valid scheme reference number
test_claim_search("E11NTA20240010387")
