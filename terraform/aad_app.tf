# Register the application in Azure AD for the React app
resource "azuread_application" "semafor2_app" {
  display_name = "Semafor2 App"

  single_page_application {
    redirect_uris = [
      "http://localhost:3000/",
      # the storage account primary web endpoint
      "${azurerm_storage_account.st.primary_web_endpoint}",
    ]
  }

  required_resource_access {
    resource_app_id = "00000003-0000-0000-c000-000000000000" # Microsoft Graph API

    resource_access {
      id   = "e1fe6dd8-ba31-4d61-89e7-88639da4683d"  # User.Read (Delegated)
      type = "Scope"
    }
  }

  required_resource_access {
    resource_app_id = azuread_application.semafor2_api.client_id
    resource_access {
      id = "9f5c1e68-3a89-4f89-a5fd-d274b53e1cbe"
      type = "Scope"
    }
  
  }

  depends_on = [ azurerm_storage_account.st ]
}

# Create a service principal for the application
resource "azuread_service_principal" "semafor2_app_sp" {
  client_id = azuread_application.semafor2_app.client_id
  depends_on = [ azuread_application.semafor2_app ]
}

# Output the client ID and tenant ID
output "semafor2_app_client_id" {
  value = azuread_application.semafor2_app.client_id
}

output "semafor2_app_tenant_id" {
  value = data.azurerm_client_config.current.tenant_id
}