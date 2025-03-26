#!/usr/bin/env python3
import json
import subprocess

def get_terraform_output(output_name):
    """Fetch raw Terraform output value."""
    try:
        print(f"Fetching Terraform output for {output_name}...")
        result = subprocess.run(
            ["terraform", "-chdir=../terraform", "output", "-raw", output_name],
            capture_output=True,
            text=True,
            check=True
        )
        result.check_returncode()
        output_value = result.stdout.strip()
        print(f"Successfully fetched Terraform output for {output_name}: {output_value}")
        return output_value
    except subprocess.CalledProcessError as e:
        print(f"⚠ Warning: Unable to fetch Terraform output for {output_name}. Error: {e}")
        return ""

# Generate local.settings.json directly
settings = {
    "IsEncrypted": False,
    "Values": {
        "FUNCTIONS_WORKER_RUNTIME": "node",
        "AzureWebJobsStorage": f"DefaultEndpointsProtocol=https;AccountName={get_terraform_output('storage_account_name')};AccountKey={get_terraform_output('storage_account_key')};EndpointSuffix=core.windows.net",  # Replace with actual key
        "CLIENT_ID": get_terraform_output("semafor2_api_client_id"),
        "TENANT_ID": get_terraform_output("semafor2_api_tenant_id"),
        "CLIENT_SECRET": get_terraform_output("semafor2_api_client_secret"),
        "AZURE_STORAGE_CONNECTION_STRING": get_terraform_output("storage_account_connection_string")
    },
    "Host": {
    "CORS": "http://localhost:3000"
    }
}

# Write to local.settings.json
with open("../status-api/local.settings.json", "w") as f:
    json.dump(settings, f, indent=4)

print("✅ local.settings.json file has been successfully generated!")
