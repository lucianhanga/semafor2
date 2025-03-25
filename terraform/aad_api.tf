# Register the application in Azure AD
resource "azuread_application" "semafor2_api" {
  display_name = "Semafor2 API"

  identifier_uris = [
    "api://${var.project_name}"
  ]

  required_resource_access {
    resource_app_id = "00000003-0000-0000-c000-000000000000" # Microsoft Graph API

    resource_access {
      id   = "e1fe6dd8-ba31-4d61-89e7-88639da4683d"  # User.Read (Delegated)
      type = "Scope"
    }
  }

  api {
    oauth2_permission_scope {
      admin_consent_description  = "Allows the app to call the exposed API"
      admin_consent_display_name = "Call the exposed API"
      user_consent_description   = "Call the exposed API"
      user_consent_display_name  = "API Calls"
      value                      = "user_impersonation"
      id = "9f5c1e68-3a89-4f89-a5fd-d274b53e1cbe"
      type = "User"
      enabled = true
    }
  }
}

resource "azuread_application_pre_authorized" "azurecli" {
  application_id = azuread_application.semafor2_api.id
  authorized_client_id = "04b07795-8ddb-461a-bbee-02f9e1bf7b46"

  permission_ids = [
    "9f5c1e68-3a89-4f89-a5fd-d274b53e1cbe"
  ]

  depends_on = [ azuread_application.semafor2_api ]
}

# Create a service principal for the application
resource "azuread_service_principal" "semafo2_api_sp" {
  client_id = azuread_application.semafor2_api.client_id

  depends_on = [ azuread_application.semafor2_api ]
}

# Create a client secret for the application
resource "azuread_application_password" "semafor2_api_secret" {
  application_id = azuread_application.semafor2_api.id
  display_name          = "Semafor2 API Secret"
  end_date              = "2025-10-10T00:00:00Z" # 1 year from now

  depends_on = [ azuread_application.semafor2_api ]
}

# Output the client ID and secret
output "semafor2_api_client_id" {
  value = azuread_application.semafor2_api.client_id
}

output "semafor2_api_client_secret" {
  value = azuread_application_password.semafor2_api_secret.value
  sensitive = true
}

output "semafor2_api_tenant_id" {
  value = data.azurerm_client_config.current.tenant_id
}

# output the URI
output "semafor2_api_uri" {
  value = "api://${var.project_name}"
}