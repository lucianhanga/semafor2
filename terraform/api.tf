# define the Azure Function App Service Plan
locals {
  func_service_plan_name = "asp-${var.project_name}"
}

resource "azurerm_service_plan" "function_service_plan" {
  name                = local.func_service_plan_name
  location            = var.resource_group_location
  resource_group_name = var.resource_group_name

  sku_name = "Y1"
  os_type  = "Linux"
}

# define the Azure Function App
locals {
  func_app_name = "api-${var.project_name}"
}

# # create the Application Insights resource
# resource "azurerm_application_insights" "app_insights" {
#   name                = "${local.func_app_name}-insights"
#   location            = var.resource_group_location
#   resource_group_name = var.resource_group_name
#   application_type    = "web"
# }

# create the api function app
resource "azurerm_linux_function_app" "api" {
  name                       = local.func_app_name
  location                   = var.resource_group_location
  resource_group_name        = var.resource_group_name
  service_plan_id            = azurerm_service_plan.function_service_plan.id
  storage_account_name       = azurerm_storage_account.st.name
  storage_account_access_key = azurerm_storage_account.st.primary_access_key
  functions_extension_version = "~4"

  site_config {
    application_stack {
      python_version = "3.10"
    }

    cors {
      allowed_origins     = [
        "http://localhost:3000", # for local development only
        substr(azurerm_storage_account.st.primary_web_endpoint, 0, length(azurerm_storage_account.st.primary_web_endpoint) - 1)
      ]
      support_credentials = true
    }
  }

  app_settings = {
    "STORAGE_ACCOUNT_NAME" = azurerm_storage_account.st.name,
    "SEMAFOR2_API_CLIENT_SECRET" = azuread_application_password.semafor2_api_secret.value,
#    "APPINSIGHTS_INSTRUMENTATIONKEY" = azurerm_application_insights.app_insights.instrumentation_key
  }

  auth_settings_v2 {
    auth_enabled = true
    require_authentication = true
    unauthenticated_action = "Return401"
    active_directory_v2 {
      client_id = azuread_application.semafor2_api.client_id
      tenant_auth_endpoint = "https://login.microsoftonline.com/${data.azurerm_client_config.current.tenant_id}/v2.0"
      client_secret_setting_name = "SEMAFOR2_API_CLIENT_SECRET"

      allowed_audiences = azuread_application.semafor2_api.identifier_uris
    }
    login {
    }
  }

  identity {
    type = "SystemAssigned"
  }

  depends_on = [ 
    azuread_application.semafor2_api,
    azurerm_service_plan.function_service_plan,
    azurerm_storage_account.st
#    azurerm_application_insights.app_insights
  ]
}


# assign the identity of the function app to the storage account to deal with the table
resource "azurerm_role_assignment" "function_app_storage_account_table_rights" {
  scope                = azurerm_storage_account.st.id
  role_definition_name = "Storage Table Data Contributor"
  principal_id         = azurerm_linux_function_app.api.identity[0].principal_id

  depends_on = [
    azurerm_storage_table.table,
    azurerm_linux_function_app.api
  ]
}


output "api_base_url" {
  value = azurerm_linux_function_app.api.default_hostname
}