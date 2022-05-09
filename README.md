# Static Web App with Net6.0 and React

This is an example of a single page application, all hosted in a single [Azure Static Web Apps](https://docs.microsoft.com/en-us/azure/static-web-apps/). The backend is written in C# and the frontend is written in React/Typescript. The infrastructure is created with [Bicep](https://docs.microsoft.com/en-us/azure/azure-resource-manager/bicep/). The deployments use staging environments and is done with Github actions. This example is influenced the tutorial: https://docs.microsoft.com/en-us/azure/static-web-apps/deploy-blazor.


## Folder structure

* **app**: The react sample application
* **api**:  A C# Azure Functions API, which the application will call
* **infrastructure**: Infrastructure by code, a bicep template
* **.github/workflows/deploy-static-web-app.yml**: A github actions for deployment

## Deployment
Before a deploy of Static Web Apps code can be done, you have to create the infrastructure (see below). The github action needs a secret to be able to deploy to the static web app. Copy the deployment token (on the static web app overview) and create a secret in github called "AZURE_STATIC_WEB_APPS_API_TOKEN"

### Create the infrastructure

First deploy infrastructure with bicep

```
az login
az account set --subscription <SUBSCRIPTION-ID-OR-SUBSCRIPTION-NAME>

resourceGroupName="<resource group name>"
az group create --name $resourceGroupName --location "westeurope"

az deployment group create \
--name DeployLocalTemplate-01 \
--resource-group $resourceGroupName \
--template-file main.bicep \
--parameters main.parameters.json \
--verbose
```

### Prepare github actions

The github actions needs a deployment token. You find the deployment token on the Static Web App you created previous (`Overview -> Manage deployment token`). Create a secret "AZURE_STATIC_WEB_APPS_API_TOKEN" in github with the deployment token.

### Deploy to Azure Static Web Apps

At this time the only option is to deploy with github actions, see .github/workflows/deploy-static-web-app.yml.

Not supported:
* Deploy with vscode (works if you link static app to github, this is not done in this example)
* Deploy with az cli

### How it works
On each PR a new staging environment is created on your Static Web App. If you browse to your Static Web App in the Azure portal you find the staging uri for your PR. When the PR is closed the staging environment (for your PR) is removed. Then the main branch is deployd automatically on the production environment.

## How to Run locally in vscode:
------------
```
Select SWA: Run app
press F5
```

## How to Run locally in the terminal:
Start both or only one in the terminal

### Start the API
```
cd api
func start
(curl http://localhost:7071/api/HttpTrigger1)
(curl http://localhost:7071/api/WeatherForecast)
```

### Start the App
```
cd app
(yarn install)
yarn start
```

### Start Both Api and App
```
swa start ./app/build/ --api-location ./api
(http://localhost:4280)
```

## Prerequisite
------------
```
npm install -g azure-functions-core-tools@4 --unsafe-perm true
npm install -g @azure/static-web-apps-cli
Install azure cli - https://docs.microsoft.com/en-us/cli/azure/install-azure-cli
Install Bicep cli - https://docs.microsoft.com/en-us/azure/azure-resource-manager/bicep/install
```

Links
```
https://docs.microsoft.com/en-us/azure/static-web-apps/overview
https://useiconic.com/open
https://react-bootstrap.github.io
```